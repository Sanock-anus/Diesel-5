const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameUrl: { type: String, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
