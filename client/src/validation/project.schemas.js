import * as Yup from "yup";

// Create Project
export const CreateProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "A project name is required.")
    .max(150, "Your project name exceeds the character limit (150).")
    .trim()
    .required("A project name is required."),
  desc: Yup.string()
    .min(1, "A project description is required.")
    .max(500, "Your project description exceeds the character limit (150).")
    .trim()
    .required("A project description is required."),
});

// Create Task
export const createTaskSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "A task name is required.")
    .max(150, "Your task name exceeds the character limit (150).")
    .trim()
    .required("A task name is required."),
  desc: Yup.string()
    .min(1, "A task description is required.")
    .max(500, "Your task description exceeds the character limit (150).")
    .trim()
    .required("A task description is required."),
});

