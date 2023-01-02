import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthRoute(props) {
  const { isAuthRoute } = props;
  const { loggedIn } = useSelector((state) => state.auth);
  const previousPage = sessionStorage.getItem("PREVIOUS_PAGE");
  return (
    <>
      {isAuthRoute ? (
        <>
          {!loggedIn ? (
            props.children
          ) : (
            <Navigate replace to={previousPage ? previousPage : "/"} />
          )}
        </>
      ) : (
        <>{loggedIn ? props.children : <Navigate replace to="/signup" />}</>
      )}
    </>
  );
}

export default AuthRoute;
