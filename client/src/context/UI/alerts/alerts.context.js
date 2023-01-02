import React, { createContext, useContext, useState } from "react";

// Alerts Context
const AlertsContext = createContext();
export const useAlerts = () => useContext(AlertsContext);
export const AlertsContextProvider = (props) => {
  // Error Alert
  const [errorAlert, setErrorAlert] = useState({
    show: false,
    message: "Sorry, a problem occured.",
  });
  const showErrorAlert = (message) =>
    setErrorAlert((alert) => ({ ...alert, show: true, message }));
  const hideErrorAlert = () =>
    setErrorAlert((alert) => ({ ...alert, show: false }));

  // Success Alert
  const [successAlert, setSuccessAlert] = useState({
    show: false,
    message: "Success, something went right!",
  });
  const showSuccessAlert = (message) =>
    setSuccessAlert((alert) => ({ ...alert, show: true, message }));
  const hideSuccessAlert = () =>
    setSuccessAlert((alert) => ({ ...alert, show: false }));

  return (
    <AlertsContext.Provider
      value={{
        error: { errorAlert, showErrorAlert, hideErrorAlert },
        success: {
          successAlert,
          showSuccessAlert,
          hideSuccessAlert,
        },
      }}
    >
      {props.children}
    </AlertsContext.Provider>
  );
};
