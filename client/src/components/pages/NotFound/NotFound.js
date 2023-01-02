import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="container not-found-container center">
      <div className="center-vertical">
        <h1 className="container__title">
          4<span>0</span>4
        </h1>
        <p className="not-found-container__body">
          The page you're looking for does not exist.
        </p>
        <NavLink to="/" className="not-found-container__link">
          Back Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
 