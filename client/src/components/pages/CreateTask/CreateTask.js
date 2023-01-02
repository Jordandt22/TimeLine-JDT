import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Schemas
import { createTaskSchema } from "../../../validation/project.schemas";

// Redux
import { updateProject } from "../../../redux/user/user.reducer";

// Contexts
import { useTaskAPI } from "../../../context/API/taskAPIContext";

// Components
import CreateForm from "../../templates/forms/CreateForm";

function CreateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectID } = useParams();
  const { API__createTask } = useTaskAPI();

  return (
    <CreateForm
      initialValues={{
        name: "",
        desc: "",
      }}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        API__createTask(projectID, { ...values }, (data, errors) => {
          if (errors) {
            setSubmitting(false);
            return setErrors({ ...errors });
          }

          // Updating User's Projects List in Redux
          const { _id, updatedAt, createdAt } = data?.project;
          dispatch(
            updateProject({
              projectID: _id,
              updatedProject: { updatedAt, createdAt },
            })
          );
          resetForm();
          setSubmitting(false);
          navigate(`/project/${projectID}`);
        });
      }}
      schema={createTaskSchema}
      form={{
        formTitle: "Create a Task",
        nameInput: {
          label: "Task Name",
          placeholder: "Ex: Finish Homework",
        },
        descInput: {
          label: "Task Description",
          placeholder: "A description for your new task...",
        },
        createBtnText: "Create Task",
        cancelLink: `/project/${projectID}`,
      }}
    />
  );
}

export default CreateTask;
