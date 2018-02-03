const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  username: String,
  title: String,
  type: String,
  date: Number,
  location:String,
  groups: Array,
  chair: String,
  lists: Array,
  members: Array,
  minutes: Array,
  actions: Array,
  decisions:Array
});

const Message = mongoose.model('message', MessageSchema);


module.exports = Message;
