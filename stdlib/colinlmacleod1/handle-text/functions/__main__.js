const lib = require('lib')({token: process.env.STDLIBTOKEN});
const mongoose = require('mongoose');
const Song = require('../models/songs.js');
mongoose.connect("mongodb://"+process.env.DBURI))
/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */



module.exports = async (sender="Test", receiver="Test", message="Test", createdDatetime="Test", context) => {
  var messages = message.split(" - ");

  console.log(messages)
  console.log("Connected")
  var newSong = new Song({
    sender: sender,
    title: messages[0],
    artist: messages[1]
	});
	console.log(newSong)
  await newSong.save();
};
