import React from "react";

function ProjectSkeleton() {
  return (
    <div className="project-skeleton container project-container">
      {/* Header */}
      <header className="projects-header between-row">
        <div>
          <div className="project-skeleton__title"></div>
          <div className="project-skeleton__subTitle"></div>
        </div>
        <div className="row">
          <div className="project-skeleton__button"></div>
          <div className="project-skeleton__button"></div>
          <div className="project-skeleton__button"></div>
        </div>
      </header>

      {/* Info */}
      <div className="project-skeleton__info"></div>
      <div className="project-skeleton__info"></div>
      <div className="project-skeleton__info"></div>

      {/* Status Filters */}
      <div className="status-filters row">
        <div className="project-skeleton__status-filters"></div>
        <div className="project-skeleton__status-filters"></div>
        <div className="project-skeleton__status-filters"></div>
        <div className="project-skeleton__status-filters"></div>
      </div>

      {/* Project Tasks */}
      <div className="project-container__tasks">
        <div className="project-tasks"></div>
        <div className="project-tasks"></div>
        <div className="project-tasks"></div>
        <div className="project-tasks"></div>
        <div className="project-tasks"></div>
        <div className="project-tasks"></div>
      </div>
    </div>
  );
}

export default ProjectSkeleton;
