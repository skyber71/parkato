import React, { useState } from "react";
import axios from "axios";
import "../assets/login.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // For showing messages like success or error

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation for empty fields
        if (!email || !password) {
            setMessage("Please enter both email and password.");
            return;
        }

        try {
            // Send POST request with email and password
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            // Store the JWT token in localStorage
            localStorage.setItem("jwtToken", response.data.jwtoken);

            // Show success message
            setMessage("Login successful!");

            // Optionally: Print the JWT token to the console
            console.log("JWT Token:", response.data.jwtoken);

            // You can navigate to another page if necessary, e.g., using react-router
            // history.push("/dashboard"); // or use navigate() with React Router v6
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Show error message from backend
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
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
            {message && <p>{message}</p>}

            {/* Link to redirect to the register page */}
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
