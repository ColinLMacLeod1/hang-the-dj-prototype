const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  sender: String,
  title: String,
  artist: String
});

const Song = mongoose.model('song', SongSchema);


module.exports = Song;
