const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost:27017");
const userRoute = require("./routes/userRoute")
app.use("/",userRoute);

app.listen(3000,(err)=>{
    if(err){
        console.log("Error starting server:", err);
        return;
    }
    else{
        console.log("Server started successfully");
    }
})