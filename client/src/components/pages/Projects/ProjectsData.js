import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Icons
import { ExceptionOutlined } from "@ant-design/icons";

// Utils
import { checkStatus } from "../../../utils/project.utils";

// Contexts
import { useUserAPI } from "../../../context/API/userAPI.context";

// Components
import ErrorMessage from "../../layouts/ErrorMessage";
import ProjectsSkeleton from "../../templates/skeletons/ProjectsSkeleton";

function ProjectsData() {
  const navigate = useNavigate();
  const { QUERY__getUserProjects } = useUserAPI();
  const { isLoading, isError, data, error } = useQuery(
    ["user_projects"],
    QUERY__getUserProjects
  );

  // Loading && Error
  if (isLoading) {
    return <ProjectsSkeleton />;
  } else if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const projects = data?.data?.projects;
  return (
    <div className="projects">
      {projects.length > 0 ? (
        <>
          {projects.map((item, i) => {
            const { projectID, name, status } = item;
            const currentStatus = checkStatus(status);

            return (
              <div
                key={projectID}
                className="project-item between-row"
                onClick={() => navigate(`/project/${projectID}`)}
              >
                <p className="project-item__name">
                  {name}{" "}
                  <span
                    className={
                      "project-item__status " + currentStatus.className
                    }
                  >
                    #{currentStatus.text}
                  </span>
                </p>

                <div className="project-item__tasks row">
                  <ExceptionOutlined className="icon" />
                  <p>
                    {
                      item?.tasks?.filter(
                        (task) => task.status.isFinished !== true
                      ).length
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="none">You haven't created any projects.</p>
      )}
    </div>
  );
}

export default ProjectsData;
