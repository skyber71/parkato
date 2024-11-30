const express            = require('express');
const merchant_routes    = express();
const merchantController = require("../controllers/merchantControllers")
const bodyParser         = require('body-parser');


merchant_routes.use(bodyParser.json());
merchant_routes.use(bodyParser.urlencoded({extended: true}));


merchant_routes.post('/api/merchant/register', merchantController.registerMerchant);


module.exports = merchant_routes;