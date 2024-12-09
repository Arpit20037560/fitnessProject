const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateData = require("../utils/validate");
const User = require("../models/User");

// Register User
authRouter.post("/register", async (req, res) => {
  try {
    // Validate Data
    validateData(req);

    // Extract Data
    const { name, email, password } = req.body;

    // Ensure password is valid
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Find Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword, 
    });

    // Save in DB
    await user.save();

    const populatedUser = await User.findById(user._id);

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "Fitness@123",
      { expiresIn: '8h' }
    );

    // Set JWT token as a cookie
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000,
      sameSite: 'None' 
    });

    // Send the response with the user data
    res.send(populatedUser);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// Login User
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const loggedInUser = await User.findOne({ email });

    // Check if user exists
    if (!loggedInUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Trim the password and compare it with the stored hash
    const trimmedPassword = password.trim(); 
    const isPasswordAllowed = await bcrypt.compare(trimmedPassword, loggedInUser.password);

    if (!isPasswordAllowed) {
      return res.status(400).json({ message: "Password is invalid" });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: loggedInUser._id, email: loggedInUser.email },
      process.env.JWT_SECRET || "Fitness@123", 
      { expiresIn: '8h' }
    );

    // Set token as cookie
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000,
       sameSite: 'None'
    });

    // Send the user data (excluding password)
    res.send(loggedInUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Logout
authRouter.post("/logout", async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.send("Logout Successfully");
});

module.exports = authRouter;
