import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Contexts
import { useProjectAPI } from "../../../context/API/projectAPI.context";

// Components
import ErrorMessage from "../../layouts/ErrorMessage";
import EditTaskData from "./EditTaskData";
import EditFormSkeleton from "../../templates/skeletons/EditFormSkeleton";

function EditTask() {
  const { projectID, taskID } = useParams();
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
  const tasks = project.tasks;
  const task = tasks.filter((t) => t._id === taskID)[0];
  return (
    <>
      {tasks.length > 0 && task ? (
        <EditTaskData
          projectID={projectID}
          taskID={taskID}
          user={user}
          task={task}
        />
      ) : (
        <div className="container no-tasks-container">
          <h1 className="container__title">
            No Tasks Found for "{project.name}"
          </h1>
          <p className="none">There are no tasks in this project to edit.</p>
          <NavLink to="/projects">Back to Projects</NavLink>
        </div>
      )}
    </>
  );
}

export default EditTask;
