import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"; // Include Link for navigation
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import "./assets/style.css"; // Importing the CSS for styling

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} /> {/* Default route redirects to Login */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;