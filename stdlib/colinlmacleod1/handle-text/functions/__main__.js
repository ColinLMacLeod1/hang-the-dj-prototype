const lib = require('lib')({token: "axNvrmzjPbg4FOWFi_WaHT49FoIWjnaxZZLTrft8tb9wZc-R7UyhUQgqskQF3x_U"});
const mongoose = require('mongoose');
const Message = require('../models/messages.js');

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */



module.exports = async (sender, receiver, message, createdDatetime, context) => {
  console.log(message)
  mongoose.Promise = global.Promise;

  mongoose.connect("mongodb://root:RD5f63snrUJc@35.224.232.189", {
    UseMongoClient: true
  }).catch(function(err){
    console.log(err)
    return error;
  });

  await mongoose.connection.once('open',function(){
   console.log('Connection made');
   return "Connection";
  }).on('error',function(error){
   console.log('Connection error',error);
   return error;
  });

};
