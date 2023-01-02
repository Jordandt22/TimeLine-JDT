import React, { useEffect } from "react";

// Icons
import { WarningOutlined, CloseOutlined } from "@ant-design/icons";

// Contexts
import { useAlerts } from "../../../context/UI/alerts/alerts.context";

function ErrorAlert() {
  const {
    error: { errorAlert, hideErrorAlert },
  } = useAlerts();

  useEffect(() => {
    if (errorAlert.show) {
      setTimeout(hideErrorAlert, 5000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorAlert]);

  return (
    <>
      {errorAlert.show && (
        <div className="alert error-alert between-row">
          <div className="row">
            <div className="alert__symbol center">
              <WarningOutlined className="icon" />
            </div>
            <div className="alert__info">
              <h3>Oops, something went wrong.</h3>
              <p>{errorAlert.message}</p>
            </div>
          </div>

          <CloseOutlined className="alert__close" onClick={hideErrorAlert} />
        </div>
      )}
    </>
  );
}

export default ErrorAlert;
