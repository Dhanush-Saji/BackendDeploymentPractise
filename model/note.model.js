const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title: {type:String},
    note: {type:String},
    category: {type:String},
    userID: {type:String}

  });
  
  const Notemodel=mongoose.model("Note",noteSchema) //when server starts the Database and Collection will be created automatically

  module.exports={
    Notemodel
  }

  // {
  //   "title": "Note title sample1",
  //   "note": "Note sample1",
  //   "category": "sample Category1",
  //   "author": "author1"
  // }