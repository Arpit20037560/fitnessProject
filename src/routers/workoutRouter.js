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

module.exports = workoutRouter;
