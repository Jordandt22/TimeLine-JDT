import React from "react";
import { useDispatch } from "react-redux";

// Formik
import { UpdateEmailSchema } from "../../../validation/user.schemas";

// Firebase
import { updateUserEmail } from "../../../firebase/firebase.functions";

// Redux
import { updateEmail } from "../../../redux/auth/auth.reducer";

// Contexts
import { useAlerts } from "../../../context/UI/alerts/alerts.context";

// Components
import UpdateForm from "../../templates/forms/UpdateForm";

function UpdateEmailForm(props) {
  const { closeForm, oldEmail } = props;
  const dispatch = useDispatch();
  const {
    success: { showSuccessAlert },
  } = useAlerts();

  return (
    <UpdateForm
      initialValues={{ email: oldEmail, password: "" }}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        const { email, password } = values;
        // Check if Email Changed
        if (email.trim().toLowerCase() === oldEmail.trim().toLowerCase()) {
          setSubmitting(false);
          resetForm();
          return closeForm();
        }

        // Update Firebase User Email
        updateUserEmail(email, oldEmail, password, (_, errors) => {
          if (errors) {
            setSubmitting(false);
            return setErrors({ ...errors });
          }

          // Update Redux
          dispatch(updateEmail(email));
          resetForm();
          closeForm();
          showSuccessAlert("Your email was updated successfully.");
        });
      }}
      schema={UpdateEmailSchema}
      closeForm={closeForm}
      form={{
        title: "Edit Email Address",
        isEmail: true,
      }}
    />
  );
}

export default UpdateEmailForm;
