const express         = require("express");
const app             = express();
const merchant_routes = require("./routes/merchantRoutes");
const dotenv          = require('dotenv').config();
const sql             = require("./db/db");
const cors            = require('cors');
app.use(cors());
app.use(express.json());

app.use("/",merchant_routes);


const testConnection = async () => {
    try {
        await sql`SELECT 1`;
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}
testConnection();


app.listen(8000,(err)=>{
    if(err){
        console.log("Error starting server:", err);
        return;
    }
    else{
        console.log("Server started successfully");
    }
});