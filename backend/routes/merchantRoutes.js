const express            = require('express');
const merchant_routes    = express();
const merchantController = require("../controllers/merchant-controllers")
const bodyParser         = require('body-parser');
const authenticate       = require('../middlewares/middleware');


merchant_routes.use(bodyParser.json());
merchant_routes.use(bodyParser.urlencoded({extended: true}));


merchant_routes.post('/api/merchant/register', merchantController.registerMerchant);
merchant_routes.post('/api/register', merchantController.registerMyUser);
merchant_routes.post('/api/user/booking', authenticate, merchantController.reserveParking);
merchant_routes.post('/api/user/vehicle/add', authenticate, merchantController.addVehicle);
merchant_routes.post('/api/user/vehicles', authenticate, merchantController.listVehicles);


merchant_routes.post("/api/login", merchantController.loginMyUser)


module.exports = merchant_routes;