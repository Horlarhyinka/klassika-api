const { Router } = require('express');
const router = Router();
const path = require('path');
const Joi = require('joi');
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const User = require('../models/usermodels.js');

let JWT_SECRET = process.env.JWT_SECRET;
let maxAge = 60*60*4;

const generateToken = ({_id}) =>{
  const token = jwt.sign(_id, JWT_SECRET,{maxAge: maxAge});
  return token;
}

const validator = ()=>{
res.status(400).send("bad request")
}

router.get('/',(req,res)=>{
  res.send("this is home page")
});
router.get('/sign-up',(req,res)=>{

});
router.get('/sign-in',(req,res)=>{
  res.send('sign-in get')
});

router.post('/sign-in',(req,res)=>{
  console.log(req.body)
  res.send('sign-in post' + req.body)
})

router.post('/sign-up',async(req,res)=>{
const { email, Tel, password} = req.body;
try{
  const newUser = await User.create(req.body);
  const newUserToken = await generateToken(newUser);
  res.cookie(userJWT, newUserToken,{httpOnly: true,maxAge: maxAge * 1000 });
  res.status(200).json(newUser)

}catch(err){
  res.status(500).send("could not save user")
}
//hash Password
//generate jsonwebtoken

//save to db


  res.send('sign-up post')
})
router.delete('/:id',(req,res)=>{
  console.log(req.params)
  res.send("delete request successful")
})

module.exports = router;
