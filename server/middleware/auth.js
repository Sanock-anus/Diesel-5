const jwt = require('jsonwebtoken');
const User = require('../models/User')

const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'No token provided'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select('-password');
        if(!user) {
            return res.status(404).json({message: "user not found"})
        }
        req.user = user;
         next();
    } catch(error) {
        return res.status(403).json({ message: "Invalid token"});
    }
}

module.exports = authenticateToken;
