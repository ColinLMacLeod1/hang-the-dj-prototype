const lib = require('lib')({token: process.env.STDLIBTOKEN});
const mongoose = require('mongoose');
const Song = require('../models/songs.js');
mongoose.connect("mongodb://"+process.env.DBURI)

/**
* Get the queue from Mongo
* @returns {any}
*/
module.exports = async (context) => {
  console.log("Connected")
  let response = Song.find({})
  return response;

};

//standard js
