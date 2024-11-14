const express = require('express');
const workoutRouter = express.Router();
const Workout = require("../models/Workout");
const  authenticate  = require("../middleware/authMiddleware");
const validateWorkout = require("../utils/validateWorkout"); // Ensure correct import

// Create Workout
workoutRouter.post("/create", authenticate, async (req, res) => {
    try {
       
         // Validate workout data
         validateWorkout(req);

        const { name, duration, intensity, notes } = req.body;

        const newWorkout = new Workout({
            user: req.user.userId, 
            name,
            duration,
            intensity,
            notes
        });

        await newWorkout.save();
        res.status(201).json({ message: "Workout created successfully" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Update Workout
workoutRouter.patch("/update/:id",authenticate,async (req,res)=>
{
    try {
        validateWorkout(req);

        const { name, duration, intensity, notes } = req.body;

       const workout = await Workout.findById(req.params.id);

       if (!workout) {
           return res.status(404).json({ message: "Workout not found" });
       }

        workout.name = name;
        workout.duration = duration;
        workout.intensity = intensity;
        workout.notes = notes;
    
        await workout.save();
        
        res.status(200).json({ message: "Workout updated successfully", workout });
        
    } catch (error) {
        res.status(400).json({ error: error.message });   
    }
})
//Get Workout By Id
workoutRouter.get("/:id",authenticate,async(req,res)=>
{
    try 
    {
        const workout = await Workout.findById(req.params.id);

        if(!workout)
        {
            res.status(400).json({message:"Workout is Not Found"});
        }
        res.send(workout);
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = workoutRouter;
