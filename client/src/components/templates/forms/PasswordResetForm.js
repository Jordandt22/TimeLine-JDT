import React from "react";
import { Form, Formik } from "formik";

// Firebase
import { sendResetPasswordEmail } from "../../../firebase/firebase.functions";

// Schemas
import { ResetPasswordSchema } from "../../../validation/user.schemas";

// Contexts
import { useForms } from "../../../context/UI/forms/forms.context";

// Components
import FormInput from "./FormInput";
import CustomButton from "../buttons/CustomButton";

function PasswordResetForm() {
  const { closePasswordPopUp } = useForms();

  return (
    <div className="reset-form-container shadow-container center">
      <div className="shadow" onClick={closePasswordPopUp}></div>

      <Formik
        initialValues={{ resetEmail: "" }}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
          sendResetPasswordEmail(values.resetEmail, (data, error) => {
            if (error) {
              setErrors({ ...error });
              setSubmitting(false);
            } else {
              resetForm();
              setSubmitting(false);
              closePasswordPopUp();
            }
          });
        }}
        validationSchema={ResetPasswordSchema}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form disabled={isSubmitting} className="reset-form">
            <h4 className="reset-form__title">Reset Your Password</h4>
            <FormInput
              name="resetEmail"
              type="email"
              placeholder="example@gmail.com"
              autoComplete="on"
              labelText="E-mail"
              secondaryLabelText="required"
            />
            {/* Submit */}
            <CustomButton
              buttonProps={{
                type: "button",
              }}
              className="reset-form__submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Email Sent !" : "Send Reset Email"}
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PasswordResetForm;
