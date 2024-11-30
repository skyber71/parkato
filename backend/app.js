const express         = require("express");
const app             = express();
const cors            = require('cors');
const merchant_routes = require("./routes/merchantRoutes");
const user_routes     = require("./routes/userRoutes");
const testConnection  = require("./utils/dbTest")

app.use(cors());
app.use(express.json());

app.use("/merchant", merchant_routes);
app.use("/", user_routes);



testConnection();

app.listen(8000, (err)=>{
    if(err){
        console.log("Error starting server:", err);
        return;
    }
    else{
        console.log("Server started successfully");
    }
});