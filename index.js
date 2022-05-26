const express = require("express");
const app = express();
const router = require('./controller/routes.js');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const user = require('./models/usermodels.js');

//declaring portt variable
const port = 3000;
// changing depricated promise
mongoose.Promise = global.Promise ;
//connecting to mongodb
mongoose.connect("mongodb://localhost/klassicar").then(console.log("connected to db"))
//setting up middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);
app.use(axios);
app.use( "/api", router );

//conneccting to port
app.listen(process.env.port ||port, ()=>{
  console.log("now listening to port", port)
})
