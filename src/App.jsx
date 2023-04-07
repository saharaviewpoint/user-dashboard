import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomepageAdmin from "../pages/HomepageAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import { createMedia } from "@artsy/fresnel";
import Homepage from "./pages/Homepage";
import Messages from "./pages/messages/Messages";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Projects from "./pages/projects/Projects";
import TaskCalendar from "./pages/tasks/TaskCalendar";
import TaskBoard from "./pages/tasks/TaskBoard";
import Tasks from "./pages/tasks/Tasks";
import ProjectForm from "./pages/projects/ProjectForm";
import ProjectGrid from "./pages/projects/ProjectGrid";
import ProjectBoard from "./pages/projects/ProjectBoard";
import Reports from "./pages/reports/Reports";
import ReportsTable from "./pages/reports/ReportsTable";
import ReportsGrid from "./pages/reports/ReportsGrid";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoute from "./util/ProtectedRoute";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 400,
    md: 600,
    lg: 1024,
    xl: 1192,
  },
});

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return (
    <MediaContextProvider>
      <Media at="sm">
        <p>lorem</p>
      </Media>
      <Media greaterThanOrEqual="md">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={userInfo ? <Homepage /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={userInfo ? <NotFound /> : <Navigate to="/" />}
            />
            <Route
              path="/project"
              element={userInfo ? <Projects /> : <Navigate to="/" />}
            />
            <Route
              path="/project/board"
              element={userInfo ? <ProjectBoard /> : <Navigate to="/" />}
            />
            <Route path="/project/grid" element={<ProjectGrid />} />
            <Route
              path="/project/form"
              element={userInfo ? <ProjectForm /> : <Navigate to="/" />}
            />
            <Route
              path="/task"
              element={userInfo ? <Tasks /> : <Navigate to="/" />}
            />
            <Route
              path="/task/board"
              element={userInfo ? <TaskBoard /> : <Navigate to="/" />}
            />
            <Route
              path="/task/calendar"
              element={userInfo ? <TaskCalendar /> : <Navigate to="/" />}
            />
            <Route
              path="/reports"
              element={userInfo ? <Reports /> : <Navigate to="/" />}
            />
            <Route
              path="/reports/table"
              element={userInfo ? <ReportsTable /> : <Navigate to="/" />}
            />
            <Route
              path="/reports/grid"
              element={userInfo ? <ReportsGrid /> : <Navigate to="/" />}
            />
            <Route
              path="/message"
              element={userInfo ? <Messages /> : <Navigate to="/" />}
            />

            <Route path="/register" element={<Register />} />
            {/* <Route path="/admin" element={<HomepageAdmin />} /> */}
          </Routes>
        </BrowserRouter>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
