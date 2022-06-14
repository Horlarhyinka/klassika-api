const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require("joi");

const emailRegex = new RegExp('^[0-9a-zA-Z./-_*#@!]{3,}@[a-zA-Z@.]{2,}\..[a-zA-Z]{2,}\.$');
const telRegex = new RegExp('^[0-9]{11}$');
const validateEmail = (val) =>{
 return emailRegex.test(val);
}
const validateTel = (val) =>{
  return telRegex.test(val);
 }

const Schema = mongoose.Schema;

//new user model
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [validateEmail , "invalid email address"],
    unique: true
  },
  password:{
    type: String,
    required: [true, " password is required"],
    minLength: [6, "minimum password length is 6"]
  },
  Tel:{
    type: String,
    required: [true, "phone number is required"],
    minLength: [11,"please input a valid phone number"],
    validate: [validateTel , "invalid telephone number"]
  }
})

//declaring presave functions
userSchema.pre("save",async function(){
  //genSalt
  try{
   const salt = await bcrypt.genSalt(5);
   const hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;
  }catch(err){
    console.log("could not gen salt", err)
  }
})

//creating usermodel from userschema
const User = mongoose.model("user",userSchema);
module.exports = User;
