const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        // Token from Cookie
        const token = req.cookies.token;

        // Token Validation check
        if (!token) {
            return res.status(400).json({ message: "Token is not present" });
        }

        // Decode JWT
        const decodedObj = jwt.verify(token, "Fitness@123");

        const { userId } = decodedObj;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assign the user info to req.user
        req.user = { userId: user._id, email: user.email };

        // Proceed to the next middleware
        next();
    } catch (error) {
        res.status(400).json({ message: "Authentication failed", error: error.message });
    }
};

module.exports = authenticate;
