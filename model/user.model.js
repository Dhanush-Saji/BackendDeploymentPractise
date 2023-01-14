const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {type:String,required:true},
    name: {type:String,required:true},
    password: {type:String,required:true}
  });
  
  const Usermodel=mongoose.model("UserCollection",userSchema) //when server starts the Database and Collection will be created automatically

  module.exports={
    Usermodel
  }