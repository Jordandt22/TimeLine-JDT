import React from "react";
import { useDispatch } from "react-redux";

// Formik
import { UpdatePasswordSchema } from "../../../validation/user.schemas";

// Firebase
import { updateUserPassword } from "../../../firebase/firebase.functions";

// Redux
import { updateEmail } from "../../../redux/auth/auth.reducer";

// Contexts
import { useAlerts } from "../../../context/UI/alerts/alerts.context";

// Components
import UpdateForm from "../../templates/forms/UpdateForm";

function UpdatePasswordForm(props) {
  const { closeForm, oldEmail } = props;
  const dispatch = useDispatch();
  const {
    success: { showSuccessAlert },
  } = useAlerts();

  return (
    <UpdateForm
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        const { oldPassword, newPassword } = values;

        // Check if Password Changed
        if (newPassword === oldPassword) {
          setSubmitting(false);
          resetForm();
          return closeForm();
        }

        // Update Firebase User Password
        updateUserPassword(oldEmail, oldPassword, newPassword, (_, errors) => {
          if (errors) {
            setSubmitting(false);
            return setErrors({ ...errors });
          }

          // Update Redux
          dispatch(updateEmail(oldEmail));
          resetForm();
          closeForm();
          showSuccessAlert("Your password was updated successfully.");
        });
      }}
      schema={UpdatePasswordSchema}
      closeForm={closeForm}
      form={{
        title: "Edit Password Address",
        isEmail: false,
      }}
    />
  );
}

export default UpdatePasswordForm;
