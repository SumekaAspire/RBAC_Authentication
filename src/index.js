const express = require('express');
const cors = require("cors"); //cors origin
const dotenv = require('dotenv');
const path = require('path') //path module
const connectDatabase = require('./config/connectDatabase')
dotenv.config({path: path.join(__dirname,'config','config.env')})
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


connectDatabase();
const app =express();


//Middleware
app.use(express.json())// middleware method, takes json from request and sets in body

app.use(cors({
  origin: "http://localhost:5173",  // Allow your React dev server
  credentials: true, // If you want to allow cookies/auth headers
}));


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//Start the server

app.listen(process.env.PORT,()=>{
    console.log(`server listening to port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})