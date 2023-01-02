import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Contexts
import { useAlerts } from "../UI/alerts/alerts.context";
import {
  createAuthHeader,
  errorHandler,
  createTaskURI,
} from "../../utils/global.utils";

// Project API Context
export const TaskAPIContext = createContext();
export const useTaskAPI = () => useContext(TaskAPIContext);
export const TaskAPIContextProvider = (props) => {
  const {
    user: { fbID, accessToken },
  } = useSelector((state) => state.auth);
  const {
    error: { showErrorAlert },
  } = useAlerts();

  // Create Task
  const API__createTask = (projectID, task, cb) =>
    axios
      .post(
        createTaskURI(fbID, projectID, null),
        { ...task },
        createAuthHeader(accessToken)
      )
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  // Edit Task
  const API__updateTask = (projectID, taskID, task, cb) =>
    axios
      .patch(
        createTaskURI(fbID, projectID, taskID),
        { ...task },
        createAuthHeader(accessToken)
      )
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  // Delete Task
  const DELETE__deleteTask = (projectID, taskID, cb) =>
    axios
      .delete(
        createTaskURI(fbID, projectID, taskID),
        createAuthHeader(accessToken)
      )
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  return (
    <TaskAPIContext.Provider
      value={{ API__createTask, API__updateTask, DELETE__deleteTask }}
    >
      {props.children}
    </TaskAPIContext.Provider>
  );
};
