const sqlOps  = require("../models/merchantModel");
const helpers = require("./helpers");

const registerMerchant = async (req, res) => {
    const { name, email, password } = req.body;
    await helpers.registerUser(name, email, password, sqlOps.insertMerchant, res, "/merchant/register"); // Pass sqlOps.insertMerchant as the insertFunction
}

module.exports = {
    registerMerchant,
}