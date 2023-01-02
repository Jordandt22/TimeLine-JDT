import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Redux
import { updateProjects } from "../../../redux/user/user.reducer";

// Utils
import { checkStatus, createStatusObj } from "../../../utils/project.utils";

// Components
import CreateForm from "./CreateForm";

function EditForm(props) {
  const { initialValues, API__request, schema, form, status, user } = props;
  const dispatch = useDispatch();
  const [statusInput, setStatusInput] = useState(checkStatus(status).val);

  // Updating the User Projects in Redux
  useEffect(() => {
    if (user.projects) dispatch(updateProjects(user.projects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <CreateForm
      initialValues={initialValues}
      onSubmit={(values, submitMethods) => {
        const newStatus = createStatusObj(statusInput, status);
        API__request({ ...values, status: newStatus }, submitMethods);
      }}
      schema={schema}
      form={form}
      statusField={{
        show: true,
        statusInput,
        setStatusInput: (statusVal) => setStatusInput(statusVal),
      }}
    />
  );
}

export default EditForm;
