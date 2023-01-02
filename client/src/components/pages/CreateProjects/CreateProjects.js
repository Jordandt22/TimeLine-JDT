import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Formik
import { CreateProjectSchema } from "../../../validation/project.schemas";

// Contexts
import { useProjectAPI } from "../../../context/API/projectAPI.context";

// Redux
import { addProject } from "../../../redux/user/user.reducer";

// Components
import CreateForm from "../../templates/forms/CreateForm";

function CreateProjects() {
  const navigate = useNavigate();
  const { API__createProject } = useProjectAPI();
  const dispatch = useDispatch();

  return (
    <CreateForm
      initialValues={{
        name: "",
        desc: "",
      }}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        API__createProject(values, (data, errors) => {
          if (errors) {
            setSubmitting(false);
            return setErrors({ ...errors });
          }

          // Updating User's Projects List in Redux
          const { projects } = data.user;
          dispatch(addProject(projects));
          resetForm();
          setSubmitting(false);
          navigate("/projects");
        });
      }}
      schema={CreateProjectSchema}
      form={{
        formTitle: "Create a project",
        nameInput: {
          label: "Project Name",
          placeholder: "Ex: Jordan's Project",
        },
        descInput: {
          label: "Project Description",
          placeholder: "A description for your new project...",
        },
        createBtnText: "Create Project",
        cancelLink: "/projects",
      }}
    />
  );
}

export default CreateProjects;
