import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Firebase
import {
  signInEmailUser,
  signInWithGoogle,
} from "../../../firebase/firebase.functions.js";

// Schemas
import { SignInSchema } from "../../../validation/user.schemas.js";

// Redux
import { setAuth } from "../../../redux/auth/auth.reducer.js";
import { setUser } from "../../../redux/user/user.reducer.js";

// Contexts
import { useUserAPI } from "../../../context/API/userAPI.context.js";

// Components
import AuthForm from "../../templates/forms/AuthForm";

function Signin() {
  const { API__getUser } = useUserAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get User Data and Set Redux
  const getUserAndSetRedux = (
    data,
    isLocalForm,
    { setSubmitting, resetForm }
  ) => {
    const { accessToken, uid: fbID, email } = data;
    API__getUser(accessToken, fbID, (API__data, API__error) => {
      if (API__error) {
        if (isLocalForm) setSubmitting(false);
      } else {
        const { firstName, lastName, projects } = API__data.user;
        dispatch(setAuth({ fbID, email, accessToken }));
        dispatch(setUser({ firstName, lastName, projects }));

        // Resetting Form
        if (isLocalForm) {
          resetForm();
          setSubmitting(false);
        }

        navigate("/");
      }
    });
  };

  return (
    <AuthForm
      isSignUpForm={false}
      initialValues={{
        email: "",
        password: "",
      }}
      schema={SignInSchema}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        const { email, password } = values;
        signInEmailUser(email, password, (data, errors) => {
          if (errors) {
            setErrors({ ...errors });
            setSubmitting(false);
          } else {
            getUserAndSetRedux(data, true, { setSubmitting, resetForm });
          }
        });
      }}
      onGoogleSignIn={() => {
        signInWithGoogle((data, errors) => {
          if (errors) return console.log(errors);

          getUserAndSetRedux(data, false, {});
        });
      }}
    />
  );
}

export default Signin;
