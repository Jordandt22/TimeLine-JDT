import React from "react";
import { NavLink } from "react-router-dom";

// Components
import DashboardProjectsData from "./DashboardProjectsData";

function Home() {
  const dashboardLists = [
    {
      title: "Recent Projects",
      subTitle: "In the last week",
      path: "/projects",
      type: "PROJECTS",
    },
    {
      title: "Recent Teams",
      subTitle: "In the last week",
      path: "/teams",
      type: "TEAMS",
    },
    {
      title: "New Messages",
      subTitle: "Stil unread",
      path: "/messages",
      type: "MESSAGES",
    },
  ];

  return (
    <div className="home-container container">
      <h1 className="container__title">Overview</h1>

      {/* Dashboard Lists */}
      <div className="dashboard-lists row">
        {dashboardLists.map((list) => {
          const { type, title, subTitle, path } = list;

          return (
            <div key={title} className="dashboard-list">
              <header>
                <h3 className="dashboard-list__title">{title}</h3>
                <p className="dashboard-list__subTitle">{subTitle}</p>
              </header>

              {/* View All */}
              <NavLink to={path} className="dashboard-list__viewAll">
                View All
              </NavLink>
              <hr />

              {/* Data */}
              {type === "PROJECTS" ? (
                <DashboardProjectsData />
              ) : (
                <div className="dashboard-list__none">
                  <p>This feature isn't available at this time.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
