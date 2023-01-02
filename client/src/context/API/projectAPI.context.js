import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Contexts
import { useAlerts } from "../UI/alerts/alerts.context";
import {
  createAuthHeader,
  errorHandler,
  createProjectURI,
} from "../../utils/global.utils";

// Project API Context
export const ProjectAPIContext = createContext();
export const useProjectAPI = () => useContext(ProjectAPIContext);
export const ProjectAPIContextProvider = (props) => {
  const {
    user: { fbID, accessToken },
  } = useSelector((state) => state.auth);
  const {
    error: { showErrorAlert },
  } = useAlerts();

  // Create Project
  const API__createProject = (project, cb) =>
    axios
      .post(
        createProjectURI(fbID, null),
        { ...project },
        createAuthHeader(accessToken)
      )
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  // Get Project
  const QUERY__getProject = async (projectID) =>
    await axios.get(
      createProjectURI(fbID, projectID),
      createAuthHeader(accessToken)
    );

  // Update Project
  const API__updateProject = async (projectID, newProject, cb) =>
    axios
      .patch(
        createProjectURI(fbID, projectID),
        { ...newProject },
        createAuthHeader(accessToken)
      )
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  // Delete Project
  const DELETE__deleteProject = async (projectID, cb) =>
    axios
      .delete(createProjectURI(fbID, projectID), createAuthHeader(accessToken))
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  return (
    <ProjectAPIContext.Provider
      value={{
        API__createProject,
        QUERY__getProject,
        API__updateProject,
        DELETE__deleteProject,
      }}
    >
      {props.children}
    </ProjectAPIContext.Provider>
  );
};
