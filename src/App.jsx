import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomepageAdmin from "../pages/HomepageAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import NotFound from "../pages/NotFound";
import { createMedia } from "@artsy/fresnel";
import Homepage from '../pages/user/Homepage';
import Projects from "../pages/user/Projects";

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
            <Route path = "/project" element = {<Projects/>}/>
            <Route path="/admin" element={<HomepageAdmin />} />
          </Routes>
        </BrowserRouter>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
