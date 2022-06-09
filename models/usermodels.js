const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require("joi");

const emailRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')

const hashPassword = (password) =>{
  bcrypt.genSalt(5,(err,salt)=>{
    bcrypt.hash(salt,password,(err,hashedPassword)=>{
      return hashedPassword;
    })
  })
}

const Schema = mongoose.Schema;

//new user model
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [(val)=>{emailRegex.test(val)}, "invalid email address"],
    unique: true
  },
  password:{
    type: String,
    required: [true, " password is required"],
    minLength: [6, "minimum password length is 6"]
  },
  Tel:{
    type: Number,
    required: [true, "phone numbr is required"],
    minLength: [11,"please input a valid phone number"]
  }
})
//declaring presave functions
userSchema.pre("save",async function(){
  //genSalt
  try{
    bcrypt.genSalt(5,(err,salt)=>{
      bcrypt.hash(salt,this.password,(err,hashedPassword)=>{
        this.password = hashedPassword
      })
    })
  }catch(err){
    console.log("could not gen salt", err)
  }
})

//creating usermodel from userschema
const User = mongoose.model("user",userSchema);
module.exports = User;
