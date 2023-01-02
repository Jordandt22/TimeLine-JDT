import React from "react";

// Formik
import { Form, Formik } from "formik";

// Components
import CustomButton from "../buttons/CustomButton";
import FormInput from "./FormInput";

function UpdateForm(props) {
  const {
    initialValues,
    onSubmit,
    schema,
    closeForm,
    form: { title, isEmail },
  } = props;
  const closeFormAndResetForm = (resetForm) => {
    resetForm();
    closeForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ isSubmitting, handleSubmit, resetForm }) => (
        <div className="shadow-container center">
          {/* Shadow */}
          <div
            className="shadow"
            onClick={() => {
              if (!isSubmitting) closeFormAndResetForm(resetForm);
            }}
          ></div>

          {/* Update Form */}
          <Form disabled={isSubmitting} className="update-form">
            <h2 className="update-form__title">{title}</h2>

            {/* Email Input */}
            {isEmail && (
              <FormInput
                name="email"
                type="email"
                placeholder="newexample@gmail.com"
                autoComplete="on"
                labelText="New Email Address"
                secondaryLabelText="required"
              />
            )}

            {/* Password Inputs */}
            {!isEmail ? (
              <>
                <FormInput
                  name="oldPassword"
                  type="password"
                  placeholder="Min. 8 Characters"
                  autoComplete="off"
                  labelText="Current Password"
                  secondaryLabelText="required"
                  showForgotPassword={false}
                />
                <FormInput
                  name="newPassword"
                  type="password"
                  placeholder="Min. 8 Characters"
                  autoComplete="off"
                  labelText="New Password"
                  secondaryLabelText="required"
                  showForgotPassword={false}
                />
                <FormInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Retype your new password..."
                  autoComplete="off"
                  labelText="Confirm Password"
                  secondaryLabelText="required"
                />
              </>
            ) : (
              <FormInput
                name="password"
                type="password"
                placeholder="Min. 8 Characters"
                autoComplete="off"
                labelText="Current Password"
                secondaryLabelText="required"
                showForgotPassword={false}
              />
            )}

            {/* Submit */}
            <div className="row">
              <CustomButton
                buttonProps={{
                  type: "button",
                }}
                className="update-form__submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Update
              </CustomButton>
              <CustomButton
                buttonProps={{
                  type: "button",
                }}
                className="update-form__cancel"
                disabled={isSubmitting}
                onClick={() => closeFormAndResetForm(resetForm)}
              >
                Cancel
              </CustomButton>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default UpdateForm;
