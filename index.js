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
mongoose.connect('mongodb+srv://Horlarh:1234@cluster0.syhy6.mongodb.net/?retryWrites=true&w=majority').then(()=>{console.log("connected to db")}).catch((err)=>{
  console.log("cant connect to db", err)
})
//using router middleware
app.use( router);

app.get('/test',(req,res)=>{
  res.send("hello")
})


//listening to port
app.listen( port ,()=>{
  console.log("now listening on port " + port)
})
