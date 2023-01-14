const express = require("express");
const userRouter = express.Router()
const {Usermodel } = require("../model/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



userRouter.post("/login", async (req, res) => {
  let {username,password} = req.body;
  try {
    let user = await Usermodel.find({username}); //it will retrieve the data with the given username
    if(user.length>0){
      bcrypt.compare(password, user[0].password,(err,result)=>{ //password:- user entered password,  user[0].password:- this contain the hashed password
        if(result){ // the decrypted password matches then it will return true

          let token = jwt.sign({userID:user[0]._id}, 'secret'); //setting up a token using the '_id' in user model
          res.send(token);
        }
        else{

          res.status(500).send("Invalid credentials");
        }
      });
    }
    else{
      res.status(500).send("Invalid credentials");

    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid credentials");
  }
});

userRouter.post("/register", async (req, res) => {
  const {username,password,name} = req.body
  const saltRounds = 5;
    try {
      bcrypt.hash(password,saltRounds,async(err,hash_pass)=>{ //You have to pass the original password, saltRounds :- number of times the encryption has to perform, hash_pass:- is the encrypted password(which also known as hashing)
        if(err){
          res.send(err)
        }
        else{
          const user = new Usermodel({username,password:hash_pass,name}); //password:hash_pass (we have to give this was becoz the password from the body and hashed password is different)
          await user.save();
          res.send("User registered successfully");
        }
      })
    } catch (error) {
      console.log(error);
      res.send("Error");
    }
  });

module.exports = {
    userRouter
}