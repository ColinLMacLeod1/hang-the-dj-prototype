const lib = require('lib')({token: "axNvrmzjPbg4FOWFi_WaHT49FoIWjnaxZZLTrft8tb9wZc-R7UyhUQgqskQF3x_U"});
const mongoose = require('mongoose');
const Song = require('../models/songs.js');


/**
* Get the queue from Mongo
* @returns {any}
*/
module.exports = async (context) => {

  await mongoose.connect("mongodb://root:TzZo9fMonrur@35.193.38.141:27017");
  console.log("Connected")
  let response = Song.find({})
  return response;

};

//standard js
