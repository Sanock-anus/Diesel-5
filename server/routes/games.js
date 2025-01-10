const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const authenticateToken = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const games = await Game.find().populate('author', 'username');
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    author: req.user._id,
    gameUrl: req.body.gameUrl,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
