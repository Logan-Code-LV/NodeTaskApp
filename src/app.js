import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add the HomePage route */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
