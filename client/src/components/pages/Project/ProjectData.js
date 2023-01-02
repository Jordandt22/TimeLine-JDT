import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// Date and Time
import date from "date-and-time";

// Utils
import { checkStatus, statusList } from "../../../utils/project.utils";

// Redux
import { updateProjects } from "../../../redux/user/user.reducer";

function ProjectData(props) {
  const {
    project: {
      _id: projectID,
      name,
      createdAt,
      updatedAt,
      desc,
      status,
      tasks,
    },
    user,
    openDeleteWarning,
    openTaskDisplay,
  } = props;
  const dispatch = useDispatch();
  const projectStatusData = checkStatus(status);
  const [statusFilter, setStatusFilter] = useState(4);
  const filteredTasks =
    statusFilter <= 3
      ? tasks.filter((task) => task.status[statusList[statusFilter].filter])
      : tasks;

  // Updating the User Projects in Redux
  useEffect(() => {
    if (user.projects) dispatch(updateProjects(user.projects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Project Info
  const createdDate = date.format(new Date(createdAt), "dddd, MMMM D YYYY");
  const updatedDate = date.format(new Date(updatedAt), "dddd, MMMM D YYYY");

  return (
    <>
      {/* Project Info */}
      <header className="projects-header between-row">
        <div>
          <h1 className="container__title row">{name}</h1>
          <p className={projectStatusData.className + " project-title-status"}>
            #{projectStatusData.text}
          </p>
        </div>
        <div className="row">
          <NavLink to={`/create/task/${projectID}`}>Create</NavLink>
          <NavLink to={`/edit/project/${projectID}`}>Edit</NavLink>
          <button
            type="button"
            className="projects-header__delete-btn"
            onClick={openDeleteWarning}
          >
            Delete
          </button>
        </div>
      </header>

      <h2 className="project-container__subTitle">Created On: {createdDate}</h2>
      <h2 className="project-container__subTitle">Updated On: {updatedDate}</h2>
      <h2 className="project-container__desc">
        <span>Description:</span> {desc}
      </h2>

      {/* Status Filter */}
      <div className="status-filters row">
        {statusList.map((status) => {
          const { text, className, val } = status;

          return (
            <button
              key={text}
              type="button"
              id={val === statusFilter ? "active" : "not-active"}
              className={"status-filters__btn " + className}
              onClick={() => setStatusFilter(val)}
            >
              {text}
            </button>
          );
        })}
      </div>

      {/* Tasks */}
      <div className="project-container__tasks">
        {filteredTasks.length > 0 ? (
          <>
            {filteredTasks.map((task) => {
              const {
                _id: taskID,
                name,
                desc,
                status,
                createdAt,
                updatedAt,
              } = task;
              const createdDate = date.format(new Date(createdAt), "MM/DD/YY");
              const taskStatusData = checkStatus(status);

              return (
                <div
                  key={taskID}
                  className="project-task"
                  onClick={() =>
                    openTaskDisplay({
                      taskID,
                      name,
                      desc,
                      status,
                      createdAt,
                      updatedAt,
                    })
                  }
                >
                  <div className="project-task__info">
                    <h3 className="project-task__name row">
                      {name} <span>{createdDate}</span>
                    </h3>
                    <p className="project-task__desc">{desc}</p>
                  </div>

                  <p
                    className={
                      "project-task__status " + taskStatusData.className
                    }
                  >
                    #{taskStatusData.text}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <p className="none">
            {tasks.length === 0
              ? "You haven't created any tasks for this project. You can create one by clicking the create button in the top right."
              : filteredTasks.length === 0
              ? "There aren't any tasks for this filter."
              : "You haven't created any tasks for this project. You can create one by clicking the create button in the top right."}
          </p>
        )}
      </div>
    </>
  );
}

export default ProjectData;
