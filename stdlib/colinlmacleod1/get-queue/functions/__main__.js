const lib = require('lib')({token: "axNvrmzjPbg4FOWFi_WaHT49FoIWjnaxZZLTrft8tb9wZc-R7UyhUQgqskQF3x_U"});
const mongoose = require('mongoose');
const Song = require('../models/songs.js');
mongoose.connect("mongodb://root:ETDzMb2fmzeH@104.198.164.150:27017")

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
