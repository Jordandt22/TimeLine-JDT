import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Firebase
import {
  createEmailUser,
  deleteFirebaseUser,
  signInWithGoogle,
} from "../../../firebase/firebase.functions.js";

// Schemas
import { SignUpSchema } from "../../../validation/user.schemas.js";

// Redux
import { setAuth } from "../../../redux/auth/auth.reducer.js";
import { setUser } from "../../../redux/user/user.reducer.js";

// Contexts
import { useUserAPI } from "../../../context/API/userAPI.context.js";

// Components
import AuthForm from "../../templates/forms/AuthForm";

function Signup() {
  const { API__createUser } = useUserAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create User and Set Redux
  const createUserAndSetRedux = (
    accessToken,
    fbID,
    names,
    email,
    isLocalForm,
    { setErrors, setSubmitting, resetForm }
  ) =>
    API__createUser(accessToken, fbID, names, (API__data, API__error) => {
      if (API__error) {
        deleteFirebaseUser((_, error) => {
          console.log(error);
          if (isLocalForm) {
            setErrors({ ...API__error });
            setSubmitting(false);
          }
        });
      } else {
        dispatch(setAuth({ fbID, email, accessToken }));
        dispatch(setUser({ ...names, projects: [] }));

        // Resetting Form
        if (isLocalForm) {
          resetForm();
          setSubmitting(false);
        }

        navigate("/");
      }
    });

  return (
    <AuthForm
      isSignUpForm={true}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      schema={SignUpSchema}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        const { firstName, lastName, email, password } = values;
        createEmailUser(email, password, (data, errors) => {
          if (errors) {
            setErrors({ ...errors });
            setSubmitting(false);
          } else {
            const names = { firstName, lastName };
            const { accessToken, uid: fbID } = data;
            createUserAndSetRedux(accessToken, fbID, names, email, true, {
              setSubmitting,
              setErrors,
              resetForm,
            });
          }
        });
      }}
      onGoogleSignIn={() => {
        signInWithGoogle((data, errors) => {
          if (errors) return console.log(errors);

          const { accessToken, uid: fbID, email, displayName } = data;
          const splittedDisplayName = displayName.split(" ");
          const names =
            splittedDisplayName.length > 1
              ? {
                  firstName: splittedDisplayName[0],
                  lastName: splittedDisplayName[1],
                }
              : { firstName: displayName, lastName: "~" };
          createUserAndSetRedux(accessToken, fbID, names, email, false, {});
        });
      }}
    />
  );
}

export default Signup;
