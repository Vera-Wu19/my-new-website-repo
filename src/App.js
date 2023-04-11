import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import InterviewService from "./pages/InterviewService";
import ResumeService from "./pages/ResumeService";
import RegisterLogin from "./pages/RegisterLogin";

function App() {
  return (
    <Router>
      <div>
        {/* 删除<nav>元素 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview-service" element={<InterviewService />} />
          <Route path="/resume-service" element={<ResumeService />} />
          <Route path="/register-login" element={<RegisterLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
