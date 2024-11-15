const express = require("express");
const recordRouter = express.Router();
const Record = require("../models/Record");
const authenticate = require("../middleware/authMiddleware");

// **Create Record**
recordRouter.post("/create", authenticate, async (req, res) => {
    try {
        const { exercise, maxWeight, maxReps, date } = req.body;

        const newRecord = new Record({
            user: req.user.userId, // Assumes user ID is stored in req.user after authentication
            exercise,
            maxWeight,
            maxReps,
            date,
        });

        await newRecord.save();
        res.status(201).json({ message: "Record created successfully", record: newRecord });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// **Update Record**
recordRouter.patch("/update/:id", authenticate, async (req, res) => {
    try {
        const { exercise, maxWeight, maxReps, date } = req.body;

        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (record.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to update this record" });
        }

        record.exercise = exercise || record.exercise;
        record.maxWeight = maxWeight || record.maxWeight;
        record.maxReps = maxReps || record.maxReps;
        record.date = date || record.date;

        await record.save();
        res.status(200).json({ message: "Record updated successfully", record });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// **Get Record By ID**
recordRouter.get("/:id", authenticate, async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (record.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to view this record" });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// **Get All Records for Logged-in User**
recordRouter.get("/", authenticate, async (req, res) => {
    try {
        const records = await Record.find({ user: req.user.userId });

        if (!records || records.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }

        res.status(200).json({ records });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// **Delete Record By ID**
recordRouter.delete("/delete/:id", authenticate, async (req, res) => {
    try {
        const record = await Record.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

        if (!record) {
            return res.status(404).json({ message: "Record not found or not authorized to delete" });
        }

        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// **Delete All Records for Logged-in User**
recordRouter.delete("/deleteAll", authenticate, async (req, res) => {
    try {
        const deleteResult = await Record.deleteMany({ user: req.user.userId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "No records found to delete" });
        }

        res.status(200).json({ message: "All records deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = recordRouter;
