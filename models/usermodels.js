const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require("joi");

const emailRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')

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
userSchema.pre("create",async function(){
  //genSalt
  const salt = await bcrypt.genSalt();
  //hashing Password
  const hashedPassword = await bcrypt.hash(salt, this.password);
  this.password = hashedPassword;
})

//creating usermodel from userschema
const User = mongoose.model("user",userSchema);
module.exports = User;
