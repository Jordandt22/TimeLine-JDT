import React from "react";
import { ProjectAPIContextProvider } from "./API/projectAPI.context";
import { TaskAPIContextProvider } from "./API/taskAPIContext";
import { UserAPIContextProvider } from "./API/userAPI.context";
import { AlertsContextProvider } from "./UI/alerts/alerts.context";
import { FormsContextProvider } from "./UI/forms/forms.context";
import { GlobalContextProvider } from "./UI/global/global.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AlertsContextProvider>
        <UserAPIContextProvider>
          <ProjectAPIContextProvider>
            <TaskAPIContextProvider>
              <FormsContextProvider>{props.children}</FormsContextProvider>
            </TaskAPIContextProvider>
          </ProjectAPIContextProvider>
        </UserAPIContextProvider>
      </AlertsContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
