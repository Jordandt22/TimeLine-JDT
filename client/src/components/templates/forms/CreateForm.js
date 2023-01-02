import React from "react";
import { useNavigate } from "react-router-dom";

// Formik
import { Formik, Form } from "formik";

// Components
import FormInput from "../../templates/forms/FormInput";
import CustomButton from "../../templates/buttons/CustomButton";
import { statusList } from "../../../utils/project.utils";

function CreateForm(props) {
  const {
    initialValues,
    onSubmit,
    schema,
    form: { formTitle, nameInput, descInput, createBtnText, cancelLink },
    statusField,
  } = props;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ isSubmitting, submitForm, resetForm }) => (
        <div className="create-form-containter container">
          <h1 className="container__title">{formTitle}</h1>

          <Form disabled={isSubmitting} className="create-form">
            <FormInput
              name="name"
              type="text"
              placeholder={nameInput.placeholder}
              autoComplete="off"
              labelText={nameInput.label}
              secondaryLabelText="required"
            />

            <FormInput
              name="desc"
              type="text"
              placeholder={descInput.placeholder}
              autoComplete="off"
              labelText={descInput.label}
              secondaryLabelText="required"
              isTextArea={true}
            />

            {/* Status */}
            {statusField?.show && (
              <div className="project-status form-input">
                <label>
                  Project Status <span>(optional)</span>
                </label>

                <div className="status-filters row">
                  {statusList.slice(1, statusList.length).map((status) => {
                    const { text, className, val } = status;

                    return (
                      <button
                        key={text}
                        type="button"
                        id={
                          val === statusField?.statusInput
                            ? "active"
                            : "not-active"
                        }
                        className={
                          "status-filters__btn " +
                          className +
                          `${isSubmitting && " disabled-button"}`
                        }
                        onClick={() => statusField?.setStatusInput(val)}
                        disabled={isSubmitting}
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="row">
              <CustomButton
                buttonProps={{
                  type: "button",
                }}
                className="create-form__submit"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {createBtnText}
              </CustomButton>

              <CustomButton
                buttonProps={{
                  type: "button",
                }}
                className="create-form__cancel"
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                  navigate(cancelLink);
                }}
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

export default CreateForm;
