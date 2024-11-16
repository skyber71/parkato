const dotenv         = require('dotenv').config();
const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const insertMerchant = require("./sql-queries");
const bcrypt         = require("bcrypt");
const saltRounds     = process.env.SALT_ROUNDS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const register = async (req, res) => { // Register function to handle user creation

    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields (name, email, and password) are required." });
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await insertMerchant(name, email, hashedPassword); // SQL query to insert a new user

        if (result && result.length > 0) { // Check if the result is returned and handle response

            res.status(200).json({
                message: "User registered successfully",
                user: result[0] // Assuming result is an array and user info is in the first item
            });
            console.log({"log_type": "INFO","API": "/register", "Message": "User registered successfully", "user_id": result[0].email});
        } else {

            res.status(500).json({ message: "Failed to register user" });
        }

    } catch (error) {

        if (error.code === '23505') {

            res.status(409).json({ message: 'Email is already registered.' });
            console.log({"log_type": "INFO","API": "/register", "Message": "Email is already registered."});
        } else {

            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
};

module.exports = { register };