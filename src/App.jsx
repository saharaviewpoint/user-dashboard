import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../Pages/Homepage';
import HomepageAdmin from '../Pages/HomepageAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Homepage />}/>
        <Route  path="/admin" element={<HomepageAdmin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App