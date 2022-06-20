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

const validator = (err) =>{
  if(err._message.includes("User validation failed")){
    const Errors = {};
    Object.values(err.errors).forEach(({properties}) =>{
      Errors[properties.path] = properties.message;
    })
    return Errors;
  }
}


router.get('/',(req,res)=>{
  res.json("this is home page");
});
router.get('/test',(req,res)=>{
  res.sendFile(path.resolve(__dirname, '../views/test.html'));
});
router.get('/sign-up',(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../views/sign-up.html"));
});
router.get('/sign-in',(req,res)=>{
  res.send('sign-in get')
});

router.get('/new-auction',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../views/newstock.html'))
})

router.post('/sign-in',async(req,res)=>{
  const { email, password } = req.body;
const user = await User.findOne({email:email});
if(user){
const userPassword = user.password;
 if(!bcrypt.compare(password,userPassword)) res.status(400).json("incorrect password");
const loginToken = await generateToken(user);
res.cookie("logged-in",loginToken,{httpOnly:true,expiresIn:maxAge*1000});
res.status(200).json(user);  
}else{
res.status(400).json("sorry, email is not registered")  
}



})

router.post('/sign-up',async(req,res,next)=>{
try{
  const newUser = await User.create(req.body);
  //
  const newUserToken = await generateToken(newUser);
  //send token
  res.cookie("userJWT", newUserToken,{httpOnly: true,maxAge: maxAge * 1000 });
  //send user
  res.status(200).json(newUser);

}catch(err){
  console.log(err)
  if (err.code === 11000) res.json("email is already taken");
next(err)
}
})
router.delete('/:id',(req,res)=>{
  console.log(req.params)
  res.send("delete request successful")
})

module.exports = router;
