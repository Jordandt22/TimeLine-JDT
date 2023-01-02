import React from "react";
import { NavLink } from "react-router-dom";

// Components
import ProjectsData from "./ProjectsData";

function Projects() {
  return (
    <div className="projects-container container">
      <header className="projects-header between-row">
        <h1 className="container__title">My Projects</h1>
        <NavLink to="/create/project">Create</NavLink>
      </header>

      <ProjectsData />
    </div>
  );
}

export default Projects;
