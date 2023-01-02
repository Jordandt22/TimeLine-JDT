import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Icons
import { WarningOutlined } from "@ant-design/icons";

// Contexts
import { useProjectAPI } from "../../../context/API/projectAPI.context";
import { updateProjects } from "../../../redux/user/user.reducer";

function DeleteWarning(props) {
  const { projectID, closeDeleteWarning } = props;
  const { DELETE__deleteProject } = useProjectAPI();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="shadow center">
      <div className="delete-warning">
        <div className="warning-header row">
          <WarningOutlined className="icon" />
          <h3>Delete Warning</h3>
        </div>
        <p>
          By continuing this deleting process, you understand that by deleting
          this project, all data regarding this project will be gone forever and
          can not be recovered.
        </p>

        {/* Warning Options */}
        <button
          type="button"
          className="delete-warning__button delete-warninig__delete"
          onClick={() => {
            DELETE__deleteProject(projectID, (data, errors) => {
              if (errors) return console.log(errors);

              // Updating Redux Projects
              closeDeleteWarning();
              dispatch(updateProjects(data.user.projects));
              navigate("/projects");
            });
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="delete-warning__button delete-warning__cancel"
          onClick={closeDeleteWarning}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteWarning;
