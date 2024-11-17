import React, { useState } from "react";
import axios from "axios";
import "../assets/home-page.css";  // You can reuse the same CSS for the register page
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState(""); // Name field for the user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // For showing messages like success or error

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation for empty fields
        if (!name || !email || !password) {
            setMessage("Please enter all fields (Name, Email, and Password).");
            return;
        }

        try {
            // Send POST request with name, email, and password
            const response = await axios.post("http://localhost:8000/register", {
                name,
                email,
                password,
            });

            // Show success message
            setMessage("Registration successful! Please login.");

            // Optionally: Print the response to the console
            console.log("Registration Response:", response.data);

            // You can navigate to the login page after successful registration
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
                <img src="/assets/login-img.jpeg" alt="Register" />
            </div>

            {/* Right half with the register form */}
            <div className="form-container">
                <h1>Welcome to ParkAtO!</h1>
                <h2>Please Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit">Register</button>
                </form>

                {/* Message for registration status */}
                {message && <p className="message">{message}</p>}

                {/* Link to login */}
                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
