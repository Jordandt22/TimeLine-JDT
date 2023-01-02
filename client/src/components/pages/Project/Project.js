import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Contexts
import { useProjectAPI } from "../../../context/API/projectAPI.context";

// Components
import ProjectData from "./ProjectData";
import ErrorMessage from "../../layouts/ErrorMessage";
import DeleteWarning from "./DeleteWarning";
import TaskDisplay from "./TaskDisplay";
import ProjectSkeleton from "../../templates/skeletons/ProjectSkeleton";

function Project() {
  const { projectID } = useParams();
  const { QUERY__getProject } = useProjectAPI();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const defaultTaskDisplay = {
    show: false,
    task: {
      taskID: null,
      name: "",
      desc: "",
      status: null,
      createdAt: "",
      updatedAt: "",
    },
  };
  const [taskDisplay, setTaskDisplay] = useState(defaultTaskDisplay);
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["user_project", projectID],
    () => QUERY__getProject(projectID)
  );

  // Loading && Error
  if (isLoading) {
    return <ProjectSkeleton />;
  } else if (isError) {
    return (
      <div className="container project-container">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  const { project, user } = data?.data;
  return (
    <div className="container project-container">
      <ProjectData
        project={project}
        user={user}
        openDeleteWarning={() => setShowDeleteWarning(true)}
        openTaskDisplay={(task) =>
          setTaskDisplay((prevState) => ({ ...prevState, show: true, task }))
        }
      />

      {/* Delete Project Warning */}
      {showDeleteWarning && (
        <DeleteWarning
          projectID={projectID}
          closeDeleteWarning={() => setShowDeleteWarning(false)}
        />
      )}

      {/* Task Display */}
      {taskDisplay.show && (
        <TaskDisplay
          projectID={projectID}
          task={taskDisplay.task}
          closeTaskDisplay={() => setTaskDisplay(defaultTaskDisplay)}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default Project;
