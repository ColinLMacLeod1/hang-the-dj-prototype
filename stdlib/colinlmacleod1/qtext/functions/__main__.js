const lib = require('lib')({token: process.env.STDLIBTOKEN});

/**
* A basic Hello World function
* @param {string} receiver Who you're saying hello to
* @param {string} message
* @returns {any}
*/
module.exports = async (receiver = "16136190627", message = "hello", context) => {
  let result = await lib.messagebird.tel.sms({
    originator: "12262124435",
    recipient: receiver,
    body: message
  })
  return result;

};
