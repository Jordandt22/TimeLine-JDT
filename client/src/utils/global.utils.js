const { REACT_APP_SERVER_URI } = process.env;

// Global Utils
export const developmentLogger = (message) => {
  if (process.env.NODE === "development") console.log(message);
};

// API Utils
export const errorHandler = (error, cb, showErrorAlert) => {
  developmentLogger(error);

  // Custom Server Error
  const customServerError = error?.response?.data?.error;
  if (customServerError && customServerError.isValidationError)
    return cb(null, customServerError.message);

  // Server Error
  showErrorAlert("A problem occured on the server.");
  cb(null, {});
};

export const createAuthHeader = (accessToken) => ({
  headers: { Authorization: `Bearer ${accessToken}` },
});

export const createUserURI = (fbID) =>
  REACT_APP_SERVER_URI + "/api/user/" + fbID;

export const createProjectURI = (fbID, projectID) =>
  createUserURI(fbID) + `/projects${projectID ? `/${projectID}` : ""}`;

export const createTaskURI = (fbID, projectID, taskID) =>
  createUserURI(fbID) +
  `/project/${projectID}/tasks${taskID ? `/${taskID}` : ""}`;
