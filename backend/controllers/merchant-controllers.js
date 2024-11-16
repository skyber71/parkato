const express        = require("express");
const app            = express();
const {
    insertMerchant,
    insertMyUser,
    getUserPassword
}                    = require("./sql-queries");
const {
    registerUser,
    loginUser
}                    = require("./helpers");



const registerMerchant = async (req, res) => {
    const { name, email, password } = req.body;
    await registerUser(name, email, password, insertMerchant, res, "/merchant/register"); // Pass insertMerchant as the insertFunction
};

const registerMyUser = async (req, res) => {
    const { name, email, password } = req.body;
    await registerUser(name, email, password, insertMyUser, res, "/register"); // Pass a different function
};

const loginMyUser = async (req, res) => {
    const { email, password } = req.body;
    await loginUser(email, password, getUserPassword, res, "/login")
}


const reserveParking = async (req, res) => {
    const { parkingSpaceId, date, timeIn, timeOut, userId, userVehicleId } = req.body;
    


}

module.exports = {
    registerMerchant,
    registerMyUser,
    loginMyUser
};