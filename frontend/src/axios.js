import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000", // Your backend API URL
    timeout: 5000, // Set a timeout for requests
});

export default instance;
