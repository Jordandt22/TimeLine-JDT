import React, { createContext, useContext, useState } from "react";

// Forms Context
export const FormsContext = createContext();
export const useForms = () => useContext(FormsContext);
export const FormsContextProvider = (props) => {
  const [showPasswordPopUp, setShowPasswordPopUp] = useState(false);
  const openPasswordPopUp = () => setShowPasswordPopUp(true);
  const closePasswordPopUp = () => setShowPasswordPopUp(false);

  return (
    <FormsContext.Provider
      value={{ showPasswordPopUp, openPasswordPopUp, closePasswordPopUp }}
    >
      {props.children}
    </FormsContext.Provider>
  );
};
