const express            = require('express');
const merchant_routes    = express();
const merchantController = require("../controllers/merchant-controllers")
const bodyParser         = require('body-parser');


merchant_routes.use(bodyParser.json());
merchant_routes.use(bodyParser.urlencoded({extended: true}));


merchant_routes.post('/register', merchantController.register);


module.exports = merchant_routes;