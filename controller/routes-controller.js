const { Router } = require('express');
const router = Router();
const path = require('path');
const Joi = require('joi');
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const User = require('../models/usermodels.js');



let JWT_SECRET = process.env.JWT_SECRET || "my little secret";
let maxAge = 60*60*4;

const generateToken = ({_id}) =>{
  const token = jwt.sign({_id}, JWT_SECRET,{expiresIn: maxAge});
  return token;
}



router.get('/',(req,res)=>{
  res.send("this is home page")
});
router.get('/sign-up',(req,res)=>{
res.sendFile(path.resolve(__dirname,'../views/sign-up.html'))
});
router.get('/sign-in',(req,res)=>{
  res.send('sign-in get')
});

router.post('/sign-in',(req,res)=>{
  console.log(req.body)
  res.send('sign-in post' + req.body)
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
next
}
})
router.delete('/:id',(req,res)=>{
  console.log(req.params)
  res.send("delete request successful")
})

module.exports = router;
