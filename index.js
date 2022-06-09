const express = require("express");
const app = express();
<<<<<<< HEAD
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const user = require('./models/usermodels.js');
const bodyparser = require('body-parser');
const router = require('./controller/routes-controller');
=======
>>>>>>> 00bbc76364abee2b83a365d334f95413f47fcf3c
const dotenv = require("dotenv");
const router = require('./controller/routes-controller.js');
const cookieparser = require('cookie-parser');
const mongoose = require("mongoose")
//declaring port variable
const port = Number(process.env.PORT) || 5000;
//config .env file
dotenv.config();

<<<<<<< HEAD
mongoose.promise = global.promise
//declaring portt variable
const port = Number(process.env.PORT) || 5000;

//connecting to db:

//setting up middlewares
// app.use( morgan('dev') );
// app.use( cors );
app.use(express.static("static"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//seting up routes middleware
app.use(router);
//setting up error middleware
=======
//setting up middlewares;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(express.static("static"));

//connecting  to db
mongoose.connect('mongodb+srv://Horlarh:1234@cluster0.syhy6.mongodb.net/klassika').then(()=>{console.log("connected to db")}).catch((err)=>{
  console.log("cant connect to db", err)
})
//using router middleware
app.use( router);
//error handling middleware
app.use((err,req,res,next)=>{
  const Errors = {};
  console.log(errs)
})


>>>>>>> 00bbc76364abee2b83a365d334f95413f47fcf3c

//listening to port
app.listen( port ,()=>{
  console.log("now listening on port " + port)
})
