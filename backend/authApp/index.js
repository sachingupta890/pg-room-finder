//step 1 import express 
const express = require('express');
//instance of express
const app = express();

// step 3 import dotenv file 
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//use middleware to parse the json file
app.use(express.json());

// connect to db
require('./config/database').connect();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


//import the routes 
const user = require("./routes/user");
//mount 
app.use("/api/v1", user);

// activate the server 
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})


