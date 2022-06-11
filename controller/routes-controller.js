const { Router } = require('express');
const router = Router();
const path = require('path');
const Joi = require('joi');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require('../models/usermodels.js');



let JWT_SECRET = process.env.JWT_SECRET || "my little secret";
let maxAge = 60*60*4;

const generateToken = ({_id}) =>{
  const token = jwt.sign({_id}, JWT_SECRET,{expiresIn: maxAge});
  return token;
}



router.get('/',(req,res)=>{
  res.json("this is home page");
});
router.get('/sign-up',(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../views/sign-up.html"));
});
router.get('/sign-in',(req,res)=>{
  res.send('sign-in get')
});

router.post('/sign-in',async(req,res)=>{
  const { email, password } = req.body;
const user = mongoose.findOne(email);
const userPassword = user.password;
 if(!bcrypt.compare(password,userPassword)) res.status(400).json("incorrect password");
const loginToken = await generateToken(user);
res.cookie("logged-in",loginToken,{httpOnly:true,expiresIn:maxAge*1000});
res.status(200).json(user);

})

router.post('/sign-up',async(req,res,next)=>{
  console.log(req.body)
try{
  const newUser = await User.create(req.body);
  //
  const newUserToken = await generateToken(newUser);
  //send token
  res.cookie("userJWT", newUserToken,{httpOnly: true,maxAge: maxAge * 1000 });
  //send user
  res.status(200).json(newUser);

}catch(err){
  const Errors = {};
  if (err.keyCode === 1100) res.json("email is already taken");
next(err)
}
})
router.delete('/:id',(req,res)=>{
  console.log(req.params)
  res.send("delete request successful")
})

module.exports = router;
