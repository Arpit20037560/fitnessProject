const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req,res,next)=>
{
    try 
    {
        //Token from Cookie
       const token = req.cookies.token;

        //Token Validation check
       if(!token)
       {
        res.status(400).json({message:"Token is not present"});
       }

       //decoded jwt
       const decodedObj = jwt.verify(token,"Fitness@123");

       const {userId} = decodedObj;

       const user = User.findById({userId});

       if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    //Assign the user value in req.user
    req.user = { userId: user._id, email: user.email };

       next();
       
        
    } catch (error) 
    {
        res.status(400).json({message:"Authentication Failed"})
        
    }
}

