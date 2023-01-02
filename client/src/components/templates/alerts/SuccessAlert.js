import React, { useEffect } from "react";

// Icons
import { CloudUploadOutlined, CloseOutlined } from "@ant-design/icons";

// Contexts
import { useAlerts } from "../../../context/UI/alerts/alerts.context";

function SuccessAlert() {
  const {
    success: { successAlert, hideSuccessAlert },
  } = useAlerts();

  useEffect(() => {
    if (successAlert.show) {
      setTimeout(hideSuccessAlert, 5000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successAlert]);

  return (
    <>
      {successAlert.show && (
        <div className="alert success-alert between-row">
          <div className="row">
            <div className="alert__symbol center">
              <CloudUploadOutlined className="icon" />
            </div>
            <div className="alert__info">
              <h3>Success, something went right.</h3>
              <p>{successAlert.message}</p>
            </div>
          </div>

          <CloseOutlined className="alert__close" onClick={hideSuccessAlert} />
        </div>
      )}
    </>
  );
}

export default SuccessAlert;
