import React from "react";
import { useNavigate } from "react-router-dom";

// API
import { useProjectAPI } from "../../../context/API/projectAPI.context";

// Schemas
import { CreateProjectSchema } from "../../../validation/project.schemas";

// Components
import EditForm from "../../templates/forms/EditForm";

function EditProjectData(props) {
  const {
    project: { _id: projectID, name, desc, status },
    user,
  } = props;
  const navigate = useNavigate();
  const { API__updateProject } = useProjectAPI();

  return (
    <EditForm
      initialValues={{
        name,
        desc,
      }}
      API__request={(values, { setSubmitting, setErrors, resetForm }) =>
        API__updateProject(projectID, { ...values }, (data, errors) => {
          if (errors) {
            setSubmitting(false);
            return setErrors({ ...errors });
          }

          // Updating User's Projects List in Redux
          resetForm();
          setSubmitting(false);
          navigate("/project/" + projectID);
        })
      }
      schema={CreateProjectSchema}
      form={{
        formTitle: `Edit "${name}"`,
        nameInput: {
          label: "New Project Name",
          placeholder: "Ex: Jordan's New Project",
        },
        descInput: {
          label: "New Project Description",
          placeholder: "A description for your project...",
        },
        createBtnText: "Update Project",
        cancelLink: "/project/" + projectID,
      }}
      status={status}
      user={user}
    />
  );
}

export default EditProjectData;
