import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form } from "formik";

// Images
import GoogleIcon from "../../../assets/google-icon.png";
import Logo from "../../../assets/logo.png";

// Contexts
import { useForms } from "../../../context/UI/forms/forms.context";

// Components
import FormInput from "./FormInput";
import CustomButton from "../buttons/CustomButton";
import PasswordResetForm from "./PasswordResetForm";

function AuthForm(props) {
  const { isSignUpForm, initialValues, schema, onSubmit, onGoogleSignIn } =
    props;
  const { showPasswordPopUp } = useForms();

  return (
    <div className="auth-form-container row">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form disabled={isSubmitting} className="auth-form">
            <h2 className="auth-form__title">
              {isSignUpForm ? "Welcome" : "Welcome Back"}
            </h2>
            <p className="auth-form__subText">
              {isSignUpForm
                ? "Create a new account for free."
                : "Sign in to an existing account."}
            </p>
            <CustomButton
              buttonProps={{
                type: "button",
              }}
              className="auth-form__google center"
              disabled={isSubmitting}
              onClick={onGoogleSignIn}
            >
              <img src={GoogleIcon} alt="Google Icon" />
              {isSignUpForm ? "Sign up with Google" : "Sign in with Google"}
            </CustomButton>
            <div className="auth-form__split between-row">
              <hr />
              <p>Or with E-mail</p>
              <hr />
            </div>

            {/* First & Last Name Inputs */}
            {isSignUpForm && (
              <div className="auth-form__name-inputs between-row">
                <FormInput
                  name="firstName"
                  type="text"
                  placeholder="Ex: Jordan"
                  autoComplete="off"
                  labelText="First Name"
                  secondaryLabelText="required"
                />
                <FormInput
                  name="lastName"
                  type="text"
                  placeholder="Ex: Truong"
                  autoComplete="off"
                  labelText="Last Name"
                  secondaryLabelText="required"
                />
              </div>
            )}

            {/* Email */}
            <FormInput
              name="email"
              type="email"
              placeholder="example@gmail.com"
              autoComplete="on"
              labelText="E-mail"
              secondaryLabelText="required"
            />

            {/* Password */}
            <FormInput
              name="password"
              type="password"
              placeholder="Min. 8 Characters"
              autoComplete="off"
              labelText="Password"
              secondaryLabelText="required"
              showForgotPassword={!isSignUpForm}
            />

            {/* Confirm Password */}
            {isSignUpForm && (
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Retype your password..."
                autoComplete="off"
                labelText="Confirm Password"
                secondaryLabelText="required"
              />
            )}

            {/* Submit */}
            <CustomButton
              buttonProps={{
                type: "button",
              }}
              className="auth-form__submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSignUpForm ? "Create" : "Sign In"}
            </CustomButton>

            {/* Other Auth Form */}
            <p className="auth-form__other">
              {isSignUpForm ? "Have an account?" : "Don't have an account?"}
              <NavLink to={isSignUpForm ? "/signin" : "/signup"}>
                {isSignUpForm ? "Sign In" : "Sign Up"}
              </NavLink>
            </p>
          </Form>
        )}
      </Formik>

      {/* Form Side Context */}
      <div className="form-side-content">
        <h3>Make Time</h3>
        <h1>Efficient</h1>
        <h2>For You</h2>
        <div className="form-side-content__logo center">
          <img src={Logo} alt="TimeLine Logo" />
          <p>
            Time<span>Line</span>
          </p>
        </div>

        {/* Copyright */}
        <div className="form-side-content__copyright">
          <p>©{new Date().getFullYear()} TimeLine. All Rights Reserved.</p>
        </div>
      </div>

      {/* Password Reset Form */}
      {!isSignUpForm && showPasswordPopUp && <PasswordResetForm />}
    </div>
  );
}

export default AuthForm;
