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
            <Route path="/dashboard" element={<Homepage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/project/board" element={<ProjectBoard />} />
            <Route path="/project/grid" element={<ProjectGrid />} />
            <Route path="/project/form" element={<ProjectForm />} />
            <Route path="/task" element={<Tasks />} />
            <Route path="/task/board" element={<TaskBoard />} />
            <Route path="/task/calendar" element={<TaskCalendar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/table" element={<ReportsTable />} />
            <Route path="/reports/grid" element={<ReportsGrid />} />
            <Route path="/message" element={<Messages />} />

            <Route path="/register" element={<Register />} />
            {/* <Route path="/admin" element={<HomepageAdmin />} /> */}
          </Routes>
        </BrowserRouter>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
