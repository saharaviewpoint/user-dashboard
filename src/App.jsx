import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomepageAdmin from "../pages/HomepageAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import { createMedia } from "@artsy/fresnel";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects/Projects";
import TaskCalendar from "./pages/tasks/TaskCalendar";
import TaskBoard from "./pages/tasks/TaskBoard";
import Tasks from "./pages/tasks/Tasks";
import ProjectForm from "./pages/projects/ProjectForm";
import ProjectGrid from "./pages/projects/ProjectGrid";
import ProjectBoard from './pages/projects/ProjectBoard';

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
