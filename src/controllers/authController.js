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

        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Finally Save
        const  user = new User({
            name, 
            email, 
            password: hashedPassword
        })
    //Save in DB
      await  user.save();

      res.send("User Saved Successfully");
        
    } catch (error) 
    {
        res.status(400).send("Error: " + error.message);
        
    }
})

module.exports = authRouter