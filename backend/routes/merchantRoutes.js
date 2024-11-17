const express            = require('express');
const merchant_routes    = express();
const merchantController = require("../controllers/merchant-controllers")
const bodyParser         = require('body-parser');
const authenticate = require('../middlewares/middleware');


merchant_routes.use(bodyParser.json());
merchant_routes.use(bodyParser.urlencoded({extended: true}));


merchant_routes.post('/merchant/register', merchantController.registerMerchant);
merchant_routes.post('/register', merchantController.registerMyUser);
merchant_routes.post('/user/booking', authenticate, merchantController.reserveParking);
merchant_routes.post('/user/vehicle/add', authenticate, merchantController.addVehicle);


merchant_routes.get("/login", merchantController.loginMyUser)


module.exports = merchant_routes;