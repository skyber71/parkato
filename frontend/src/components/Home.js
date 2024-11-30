import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../assets/home.css"; // Import the CSS file

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const fetchVehicles = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
            throw new Error("No token found. Please log in.");
            }

            const response = await axios.post(
            "http://localhost:8000/api/user/vehicles",
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            const { vehicles } = response.data;
            setVehicles(vehicles);
        } catch (err) {
            if (err.response?.status === 401 || err.message === "No token found. Please log in.") {
            // If token is expired or not found, redirect to login
            localStorage.removeItem("jwtToken"); // Clear any invalid tokens
            navigate("/login");
            } else {
            setError(err.message);
            }
        } finally {
            setLoading(false);
        }
        };

        fetchVehicles();
    }, [navigate]); // Include navigate in the dependency array

    return (
        <div className="vehicles-container">
        <h1 className="vehicles-title">Vehicles List</h1>
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && vehicles.length === 0 && (
            <p className="no-data-text">No vehicles found.</p>
        )}
        {!loading && !error && (
            <div className="vehicles-list">
            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="vehicle-card">
                <h2 className="vehicle-name">{vehicle.name}</h2>
                <p className="vehicle-id">ID: {vehicle.id}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default VehiclesList;
