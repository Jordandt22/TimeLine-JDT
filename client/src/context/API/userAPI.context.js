import React, { createContext, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Contexts
import { useAlerts } from "../UI/alerts/alerts.context";
import {
  createAuthHeader,
  createUserURI,
  errorHandler,
} from "../../utils/global.utils";

// User API Context
const UserAPIContext = createContext();
export const useUserAPI = () => useContext(UserAPIContext);
export const UserAPIContextProvider = (props) => {
  const {
    error: { showErrorAlert },
  } = useAlerts();
  const {
    user: { fbID, accessToken },
  } = useSelector((state) => state.auth);

  // Create User
  const API__createUser = (accessToken, fbID, names, cb) =>
    axios
      .post(createUserURI(fbID), { ...names }, createAuthHeader(accessToken))
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  // Get User
  const API__getUser = (accessToken, fbID, cb) =>
    axios
      .get(createUserURI(fbID), createAuthHeader(accessToken))
      .then(({ data }) => cb(data, null))
      .catch((error) => errorHandler(error, cb, showErrorAlert));

  // Get User Projects
  const QUERY__getUserProjects = async () =>
    await axios.get(
      createUserURI(fbID) + "/projects",
      createAuthHeader(accessToken)
    );

  return (
    <UserAPIContext.Provider
      value={{ API__createUser, API__getUser, QUERY__getUserProjects }}
    >
      {props.children}
    </UserAPIContext.Provider>
  );
};
