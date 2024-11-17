import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Include Link for navigation
import Register from "./components/Register";
import Login from "./components/Login";
import "./assets/style.css"; // Importing the CSS for styling

const App = () => {
  return (
    <Router>
      <div className="app-container">
          <h1>ParkAtO</h1>

        <main className="app-main">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} /> {/* Default route redirects to Login */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
