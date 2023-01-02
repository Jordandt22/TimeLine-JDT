import React, { useState } from "react";
import { Field } from "formik";

// Contextss
import { useForms } from "../../../context/UI/forms/forms.context";

function FormInput(props) {
  const {
    name,
    type,
    placeholder,
    autoComplete,
    labelText,
    secondaryLabelText,
    showForgotPassword,
    isTextArea,
  } = props;
  const showPasswordButton = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const { openPasswordPopUp } = useForms();

  return (
    <Field name={name}>
      {({ form: { isSubmitting }, field, meta: { touched, error } }) => {
        const inputProps = {
          className: isSubmitting
            ? "form-input__disabled-input"
            : touched && error
            ? "form-input__error-input"
            : "",
          type: showPasswordButton
            ? showPassword
              ? "text"
              : "password"
            : type,
          placeholder,
          autoComplete,
          disabled: isSubmitting,
          ...field,
        };

        return (
          <div className="form-input">
            {/* Label */}
            <label htmlFor={name}>
              {labelText} <span>({secondaryLabelText})</span>
            </label>

            {/* Input */}
            {isTextArea ? (
              <textarea {...inputProps}></textarea>
            ) : (
              <input {...inputProps} />
            )}

            {showPasswordButton && (
              <div className="between-row">
                {/* Show Password */}
                <button
                  type="button"
                  className="form-input__password-button"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? "Hide" : "Show"} password
                </button>

                {/* Forgot Password */}
                {showForgotPassword && (
                  <button
                    type="button"
                    className="form-input__password-button form-input__forgot-password"
                    onClick={openPasswordPopUp}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
            )}

            {/* Error Message */}
            {touched && error && (
              <div className="form-input__error-message">{error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
}

export default FormInput;
