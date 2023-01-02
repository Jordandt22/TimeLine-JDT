import React from "react";

function ErrorMessage(props) {
  const { message } = props;
  return (
    <div className="error-message">
      {message ? message : "Sorry, a problem occured."}
    </div>
  );
}

export default ErrorMessage;
