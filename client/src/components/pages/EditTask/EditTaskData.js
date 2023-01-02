import React from "react";
import { useNavigate } from "react-router-dom";

// Schmeas
import { createTaskSchema } from "../../../validation/project.schemas";

// Contexts
import { useTaskAPI } from "../../../context/API/taskAPIContext";

// Components
import EditForm from "../../templates/forms/EditForm";

function EditTaskData(props) {
  const { projectID, taskID, task, user } = props;
  const { name, desc, status } = task;
  const { API__updateTask } = useTaskAPI();
  const navigate = useNavigate();

  return (
    <EditForm
      initialValues={{
        name,
        desc,
      }}
      API__request={(values, { setSubmitting, setErrors, resetForm }) =>
        API__updateTask(projectID, taskID, { ...values }, (data, errors) => {
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
      schema={createTaskSchema}
      form={{
        formTitle: "Edit a Task",
        nameInput: {
          label: "New Task Name",
          placeholder: "Ex: Finish Homework",
        },
        descInput: {
          label: "New Task Description",
          placeholder: "A new description for your task...",
        },
        createBtnText: "Update Task",
        cancelLink: `/project/${projectID}`,
      }}
      status={status}
      user={user}
    />
  );
}

export default EditTaskData;
