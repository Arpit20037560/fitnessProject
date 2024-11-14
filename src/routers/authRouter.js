const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateData = require("../utils/validate")
const User = require("../models/User");

//Register User
authRouter.post("/register",async (req,res)=>
{
    try 
    {
        //validate Data
        validateData(req);

        //Extract Data
        const {name,email,password} = req.body

        // Ensure password is valid
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        //Find Existing User
        const existingUser = await User.findOne({email})

        if(existingUser)
        {
            return res.status(400).json({ message: 'User already exists' });
        }
        //Finally Save
        const  user = new User({
            name, 
            email, 
            password
        })
    //Save in DB
      await  user.save();

      res.send("User Saved Successfully");
        
    } catch (error) 
    {
        res.status(400).send("Error: " + error.message);
        
    }
})

//login User
authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const loggedInUser = await User.findOne({ email });
      
      // Check if user exists
      if (!loggedInUser) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Compare password
      const isPasswordAllowed = await bcrypt.compare(password, loggedInUser.password);
  
      if (!isPasswordAllowed) {
        return res.status(400).json({ message: "Password is invalid" });
      }
  
      // Generate JWT
      const jwtToken = jwt.sign(
        { userId: loggedInUser._id, email: loggedInUser.email },
        "Fitness@123",
        { expiresIn: '8h' }
      );
  
      // Set token as cookie
      res.cookie('token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000, // 8 hours
      });
  
      res.send("Logged In Successfully");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  //logout
    authRouter.post("/logout",async (req,res)=>
    {
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        res.send("Logout Successfully");
    })
  
module.exports = authRouter