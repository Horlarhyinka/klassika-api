const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require('./controller/routes-controller.js');
const cookieparser = require('cookie-parser');
const mongoose = require("mongoose")
//declaring port variable
const port = Number(process.env.PORT) || 5000;
//config .env file
dotenv.config();

//setting up middlewares;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(express.static("static"));

//connecting  to db
mongoose.connect('mongodb+srv://Horlarh:1234@cluster0.syhy6.mongodb.net/klassika').then(()=>{console.log("connected to db")}).catch((err)=>{
  console.log("cant connect to db")
})
//using router middleware
app.use( router);
//error handling middleware
app.use((err,req,res,next)=>{
  const Errors = {}
if(err._message.includes('user validation failed')){
Object.values(err.errors).forEach(( { properties }) =>{
  Errors[properties.path] = properties.message ;})
  res.status(404).json(Errors)};
  next();
})





//listening to port
app.listen( port ,()=>{
  console.log("now listening on port " + port)
})
