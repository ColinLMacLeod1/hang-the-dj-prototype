const lib = require('lib')({token: "axNvrmzjPbg4FOWFi_WaHT49FoIWjnaxZZLTrft8tb9wZc-R7UyhUQgqskQF3x_U"});
const mongoose = require('mongoose');
const Message = require('./models/messagess');

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */

module.exports = async (sender, receiver, message, createdDatetime, context) => {
  console.log(message)
  let result = await lib.messagebird.tel.sms({
    originator: "12262124435",
    recipient: sender,
    body: message
  })
  return result;
};
