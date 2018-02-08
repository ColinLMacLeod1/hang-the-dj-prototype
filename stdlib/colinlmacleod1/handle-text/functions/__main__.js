const lib = require('lib')({token: process.env.STDLIBTOKEN});
const Song = require('../models/songs.js');
const axios = require('axios')
/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */



module.exports = async (sender="Test", receiver="Test", message="Test", createdDatetime="Test", context) => {
  var split1 = message.split(": ")
  var code = split1[0]
  var messages = split1[1].split(" - ");
  var newSong = {
    sender: sender,
    title: messages[0],
    artist: messages[1],
    code: code
	};
  let response = await axios.post("https://hang-the-dj-server-pqfesvpbvg.now.sh/newsong",newSong);
	console.log(newSong)
};
