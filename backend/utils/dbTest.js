// db/testConnection.js
const sql = require("../db/db");

const testConnection = async (retries = 6, delay = 2000) => {
    let attempt = 0;

    while (attempt < retries) {
        try {
            attempt++;
            await sql`SELECT 1`;
            console.log("Connecting to database........");
            console.log("Connected to the database successfully!");
            return true; // Indicate a successful connection
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);

            if (attempt >= retries) {
                console.error("Exceeded maximum retries. Failed to connect to the database.");
                return false; // Indicate a failed connection
            }

            console.log(`Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
        }
    }
};

module.exports = testConnection;
