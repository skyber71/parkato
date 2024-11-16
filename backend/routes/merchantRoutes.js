const express            = require('express');
const merchant_routes    = express();
const merchantController = require("../controllers/merchant-controllers")
const bodyParser         = require('body-parser');


merchant_routes.use(bodyParser.json());
merchant_routes.use(bodyParser.urlencoded({extended: true}));


merchant_routes.post('/merchant/register', merchantController.registerMerchant);
merchant_routes.post('/register', merchantController.registerMyUser);


merchant_routes.get("/login", merchantController.loginMyUser)


module.exports = merchant_routes;