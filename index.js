const express = require("express");
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const user = require('./models/usermodels.js');
const bodyparser = require('body-parser');
const router = require('./controller/routes-controller');
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

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

//listening to port
app.listen( port,()=>{
  console.log("now listening on port " + port)
})
