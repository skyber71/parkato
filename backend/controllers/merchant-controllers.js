const express        = require("express");
const app            = express();
const {
    insertMerchant,
    insertMyUser,
    getUserPassword,
    addBooking
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
        const { parkingSpaceId, timeIn, timeOut, userId, userVehicleId } = req.body;
        console.log(req.body)
        

        const bookingData = await addBooking(parkingSpaceId, timeIn, timeOut, userId, userVehicleId);
        res.status(200).json({ message: "Booking created successfully", booking: bookingData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    registerMerchant,
    registerMyUser,
    loginMyUser,
    reserveParking
}