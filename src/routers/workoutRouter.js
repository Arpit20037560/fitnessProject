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
//Get All WorkoutDetails
workoutRouter.get("/",authenticate,async(req,res)=>
{
    try 
    {
        const workouts = await Workout.find({user:req.user.userId});

        if(!workouts)
        {
            res.send("No Workout Available");
        }
        res.status(200).json({ workouts });
    } catch (error) 
    {
        res.status(400).json({error:error.message})
        
    }
})
//Delete Workout By Id
workoutRouter.delete("/delete/:id",authenticate, async(req,res)=>
{
    try 
    {
        const workoutId = req.params.id;
        const workout = await Workout.findOneAndDelete({ _id: workoutId, user: req.user.userId });

        if(!workout)
        {
            return res.status(404).json({ message: "Workout not found or not authorized to delete" });

        }
        res.status(200).json({ message: "Workout deleted successfully" });
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// Delete All Workouts
workoutRouter.delete("/deleteAll", authenticate, async (req, res) => {
    try {
        // Use req.user.userId instead of req.userId
        const deleteResult = await Workout.deleteMany({ user: req.user.userId });

        console.log("User ID:", req.user.userId); 

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "No workouts found to delete" });
        }

        res.status(200).json({ message: "All workouts deleted successfully" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





module.exports = workoutRouter;
