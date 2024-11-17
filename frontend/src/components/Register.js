import React, { useState } from "react";
import axios from "axios";
import "../assets/register.css"
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // To show messages like success or error

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation for empty fields
        if (!name || !email || !password) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/register", {
                name,
                email,
                password,
            });

            // Handle successful registration
            setMessage(response.data.message); // Show success message from server
        } catch (error) {
            // Handle error (e.g., email already exists or other server issues)
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Show error message from server
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
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
            {message && <div id="response-message"><p>{message}</p></div>}  {/* Show the response message */}
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
