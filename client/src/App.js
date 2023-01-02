import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AuthRoute from "./components/auth/AuthRoute";
import AuthSession from "./components/auth/AuthSession";
import Home from "./components/pages/Home/Home";
import Signin from "./components/pages/Signin/Signin";
import Signup from "./components/pages/Signup/Signup";
import ErrorAlert from "./components/templates/alerts/ErrorAlert";
import Loading from "./components/layouts/Loading";
import Navbar from "./components/layouts/Navbar";
import CreateProjects from "./components/pages/CreateProjects/CreateProjects";
import Projects from "./components/pages/Projects/Projects";
import UnderConstruction from "./components/pages/UnderConstruction/UnderConstruction";
import NotFound from "./components/pages/NotFound/NotFound";
import CreateTask from "./components/pages/CreateTask/CreateTask";
import Project from "./components/pages/Project/Project";
import EditProject from "./components/pages/EditProject/EditProject";
import EditTask from "./components/pages/EditTask/EditTask";
import Settings from "./components/pages/Settings/Settings";
import SuccessAlert from "./components/templates/alerts/SuccessAlert";
import About from "./components/pages/About/About";

function App() {
  return (
    <div className="App">
      {/* Router */}
      <BrowserRouter>
        {/* Auth Session */}
        <AuthSession />

        {/* Navbar */}
        <Navbar />

        <Routes>
          {/* Main */}
          <Route
            exact
            path="/"
            element={
              <AuthRoute isAuthRoute={false}>
                <Home />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <AuthRoute isAuthRoute={true}>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <AuthRoute isAuthRoute={true}>
                <Signin />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/settings"
            element={
              <AuthRoute isAuthRoute={false}>
                <Settings />
              </AuthRoute>
            }
          />
          <Route exact path="/about" element={<About />} />

          {/* Projects */}
          <Route
            exact
            path="/create/project"
            element={
              <AuthRoute isAuthRoute={false}>
                <CreateProjects />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/edit/project/:projectID"
            element={
              <AuthRoute isAuthRoute={false}>
                <EditProject />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/projects"
            element={
              <AuthRoute isAuthRoute={false}>
                <Projects />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/project/:projectID"
            element={
              <AuthRoute isAuthRoute={false}>
                <Project />
              </AuthRoute>
            }
          />
          {/* Tasks */}
          <Route
            exact
            path="/create/task/:projectID"
            element={
              <AuthRoute isAuthRoute={false}>
                <CreateTask />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/edit/:projectID/task/:taskID"
            element={
              <AuthRoute isAuthRoute={false}>
                <EditTask />
              </AuthRoute>
            }
          />

          {/* Under Construction */}
          <Route exact path="/teams" element={<UnderConstruction />} />
          <Route exact path="/messages" element={<UnderConstruction />} />

          {/* Not Found */}
          <Route exact path="*" element={<NotFound />} />
        </Routes>

        {/* Error Alert */}
        <ErrorAlert />

        {/* Success Alert */}
        <SuccessAlert />

        {/* Loading */}
        <Loading />
      </BrowserRouter>
    </div>
  );
}

export default App;
