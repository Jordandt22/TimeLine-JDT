import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Contexts
import { useProjectAPI } from "../../../context/API/projectAPI.context";

// Components
import ErrorMessage from "../../layouts/ErrorMessage";
import EditProjectData from "./EditProjectData";
import EditFormSkeleton from "../../templates/skeletons/EditFormSkeleton";

function EditProject() {
  const { projectID } = useParams();
  const { QUERY__getProject } = useProjectAPI();
  const { isLoading, isError, data, error } = useQuery(
    ["user_project", projectID],
    () => QUERY__getProject(projectID)
  );

  // Loading && Error
  if (isLoading) {
    return <EditFormSkeleton />;
  } else if (isError) {
    return (
      <div className="container">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  const { project, user } = data?.data;
  return <EditProjectData project={project} user={user} />;
}

export default EditProject;
