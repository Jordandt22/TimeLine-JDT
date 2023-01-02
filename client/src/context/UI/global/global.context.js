import React, { createContext, useContext, useState } from "react";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalContextProvider = (props) => {
  const [loading, setLoading] = useState({
    show: false,
    message: "Loading...",
  });
  const showLoading = (message) => setLoading({ show: true, message });
  const hideLoading = () => setLoading({ show: false });

  return (
    <GlobalContext.Provider
      value={{ _loading: { loading, showLoading, hideLoading } }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
