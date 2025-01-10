const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth')

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
          });
        const newUser = await user.save();

        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({message: "User created", user, token});
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(400).json({message: "User does not exists"})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch){
             return res.status(400).json({message: "Incorrect password"});
        }
          const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

          res.json({message: "Login successfull", token, user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
  });

module.exports = router;
