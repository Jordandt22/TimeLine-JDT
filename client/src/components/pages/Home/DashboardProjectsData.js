import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Icons
import { ExceptionOutlined } from "@ant-design/icons";

// Utils
import { checkStatus } from "../../../utils/project.utils";

// Contexts
import { useUserAPI } from "../../../context/API/userAPI.context";

// Components
import DashboardSkeleton from "./DashboardSkeleton";
import ErrorMessage from "../../layouts/ErrorMessage";

function DashboardProjectsData() {
  const navigate = useNavigate();
  const { QUERY__getUserProjects } = useUserAPI();
  const { isLoading, isError, data, error } = useQuery(
    ["user_projects"],
    QUERY__getUserProjects
  );

  // Loading && Error
  if (isLoading) {
    return <DashboardSkeleton />;
  } else if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const projects = data?.data?.projects;
  return (
    <>
      {projects.length > 0 ? (
        <>
          {projects.map((item, i) => {
            const { projectID, name, desc, status } = item;
            const currentStatus = checkStatus(status);

            return (
              <div key={projectID} className="dashboard-item">
                <h4
                  className="dashboard-item__name"
                  onClick={() => navigate(`/project/${projectID}`)}
                >
                  {name}
                </h4>
                <p className="dashboard-item__desc">{desc}</p>
                <div className="between-row">
                  <p
                    className={
                      "dashboard-item__status " + currentStatus.className
                    }
                  >
                    # {currentStatus.text}
                  </p>
                  <div className="dashboard-item__project row">
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

                {/* Divider */}
                {i !== data.length - 1 && <hr />}
              </div>
            );
          })}
        </>
      ) : (
        <div className="dashboard-list__none">
          <p>You haven't created any projects.</p>
          <NavLink to="/create/project">Create one</NavLink>
        </div>
      )}
    </>
  );
}

export default DashboardProjectsData;
