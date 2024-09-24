const express = require('express');
const user_route = express();
const userController = require("../controllers/userController");


user_route.get("/login", userController.loadLogin);


module.exports = user_route;