import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomepageAdmin from "../pages/HomepageAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import { createMedia } from "@artsy/fresnel";
import NotFound from "../pages/NotFound";
import Homepage from "../pages/Homepage";
import ProjectBoard from "../pages/projects/ProjectBoard";
import ProjectGrid from "../pages/projects/ProjectGrid";
import ProjectForm from "../pages/projects/ProjectForm";
import Tasks from "../pages/tasks/Tasks";
import TaskBoard from "../pages/tasks/TaskBoard";
import TaskCalendar from "../pages/tasks/TaskCalendar";
import Projects from "../pages/projects/Projects";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

const App = () => {
  return (
    <MediaContextProvider>
      <Media at="sm">
        <p>lorem</p>
      </Media>
      <Media at="md">
        <p>lorem</p>
      </Media>
      <Media greaterThanOrEqual="xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/project/board" element={<ProjectBoard />} />
            <Route path="/project/grid" element={<ProjectGrid />} />
            <Route path="/project/form" element={<ProjectForm />} />
            <Route path="/task" element={<Tasks />} />
            <Route path="/task/board" element={<TaskBoard />} />
            <Route path="/task/calendar" element={<TaskCalendar />} />
            {/* <Route path="/admin" element={<HomepageAdmin />} /> */}
          </Routes>
        </BrowserRouter>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
