import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Services from "./Pages/services";
import AboutUs from "./Pages/AboutUs";
import Careers from "./Pages/Careers";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
};

export default App;
