const express            = require('express');
const user_routes        = express();
const userController = require("../controllers/userControllers")
const bodyParser         = require('body-parser');
const authenticate       = require('../middlewares/middleware');
const cors = require("cors");

user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({extended: true}));

user_routes.post('/api/register',                       userController.registerMyUser);
user_routes.post('/api/user/vehicle/add', authenticate, userController.addVehicle);
user_routes.post('/api/user/booking',     authenticate, userController.reserveParking);
user_routes.post('/api/user/vehicles',    authenticate, userController.listVehicles);
user_routes.post('/api/login',                          userController.loginMyUser)


module.exports = user_routes;