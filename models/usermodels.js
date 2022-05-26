const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const emailRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')

const Schema = mongoose.Schema;

//new user model
const userSchema = new Schema({
  email:{
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate:[function(val){val.test(emailRegex)}, "invalid email address"]
  },
  Tel: {
    type: Number,
    required: [true, "phone number is required"],

  },
  password: {
    type: String,
    minLength: [6, "minimum password length is 6"]
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
