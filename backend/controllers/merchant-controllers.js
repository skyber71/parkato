const express        = require("express");
const app            = express();
const {
    insertMerchant,
    insertMyUser,
    getUserPassword,
    addBooking,
    insertVehicle,
    checkVehicleForUser
}                    = require("./sql-queries");
const {
    registerUser,
    loginUser
}                    = require("./helpers");



const registerMerchant = async (req, res) => {
    const { name, email, password } = req.body;
    await registerUser(name, email, password, insertMerchant, res, "/merchant/register"); // Pass insertMerchant as the insertFunction
}

const registerMyUser = async (req, res) => {
    const { name, email, password } = req.body;
    await registerUser(name, email, password, insertMyUser, res, "/register"); // Pass a different function
}

const loginMyUser = async (req, res) => {
    const { email, password } = req.body;
    await loginUser(email, password, getUserPassword, res, "/login")
}


const reserveParking = async (req, res) => {

    try {

        const { parkingSpaceId, timeIn, timeOut, userVehicleId } = req.body;
        const userId = req.user.id; // Assuming user info is attached to the request object by the middleware
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const checkVehicle = await checkVehicleForUser(userVehicleId, userId);
        if (!checkVehicle){
            return res.status(401).json({ message: "Vehicle details not found!" });
        }
        const bookingData = await addBooking(parkingSpaceId, timeIn, timeOut, userId, userVehicleId);
        res.status(200).json({ message: "Booking created successfully", booking: bookingData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const addVehicle = async (req, res) => {

    try {
        const { vehicleName } = req.body;
    const userId = req.user.id; // Assuming user info is attached to the request object by the middleware
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const vehicleData = await insertVehicle(userId, vehicleName,);
    res.status(200).json({ message: "Vehicle added successfully", vehicle: vehicleData });

    } catch (error) {
        if (error.code === "23505"){
            res.status(409).json({ message: "Vehicle name already exists." });
            console.log({
                log_type: "INFO",
                API: "/vehicle/add",
                Message: "Vehicle name already exists.",
            });
            return;
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    registerMerchant,
    registerMyUser,
    loginMyUser,
    reserveParking,
    addVehicle
}