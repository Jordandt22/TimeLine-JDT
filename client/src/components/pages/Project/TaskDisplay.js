import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Date and Time
import date from "date-and-time";

// Utils
import { checkStatus } from "../../../utils/project.utils";

// Contexts
import { useTaskAPI } from "../../../context/API/taskAPIContext";

function TaskDisplay(props) {
  const { projectID, task, closeTaskDisplay, refetch } = props;
  const { taskID, name, desc, status, createdAt, updatedAt } = task;
  const { DELETE__deleteTask } = useTaskAPI();
  const navigate = useNavigate();
  const taskStatus = checkStatus(status);
  const createdDate = date.format(new Date(createdAt), "MM/DD/YY");
  const updatedDate = date.format(new Date(updatedAt), "MM/DD/YY");

  return (
    <div className="task-display-container shadow-container center">
      <div className="shadow" onClick={closeTaskDisplay}></div>

      <div className="task-display">
        {/* Task Info */}
        <h3 className="task-display__name">{name}</h3>
        <h4 className={"task-display__status " + taskStatus.className}>
          #{taskStatus.text}
        </h4>
        <p>Created On: {createdDate}</p>
        <p>Updated On: {updatedDate}</p>
        <p>
          <strong>Description: </strong>
          {desc}
        </p>

        {/* DELETE or EDIT Task */}
        <div className="row task-display__buttons">
          <NavLink to={`/edit/${projectID}/task/${taskID}`}>Edit</NavLink>
          <button
            type="button"
            className="task-display__delete"
            onClick={() =>
              DELETE__deleteTask(projectID, taskID, (data, errors) => {
                if (errors) return console.log(errors);

                // Updating Redux Projects
                refetch();
                closeTaskDisplay();
                navigate("/project/" + projectID);
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDisplay;
