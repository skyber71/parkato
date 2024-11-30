import React, { useState } from "react";
import axios from "axios";
import "../assets/home-page.css";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // For showing messages like success or error
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation for empty fields
        if (!email || !password) {
            setMessage("Please enter both email and password.");
            return;
        }

        try {
            // Send POST request with email and password
            const response = await axios.post(
                "http://localhost:8000/api/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Explicitly set the content type
                    },
                }
            );

            // Store the JWT token in localStorage
            localStorage.setItem("jwtToken", response.data.jwtoken);

            // Show success message
            setMessage("Login successful!");

            // Navigate to the home page
            navigate("/home");  // Navigate to the '/home' route

            // Optionally: Print the JWT token to the console
            console.log("JWT Token:", response.data.jwtoken);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Show error message from backend
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="login-page">
            {/* Left half with an image */}
            <div className="image-container">
                <img src="/assets/login-img.jpeg" alt="Login" />
            </div>

            {/* Right half with the login form */}
            <div className="form-container">
                <h1>Welcome to ParkAtO!</h1>
                <h2>Please Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>

                {/* Message for login status */}
                {message && <p className="message">{message}</p>}

                {/* Link to register */}
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
