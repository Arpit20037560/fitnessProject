const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    excercise:
    {
        type:String,
        required:true
    },
    maxWeight:
    {
        type:Number,
        required:true
    },
    maxReps:
    {
        type:Number,
        required:true
    },
    date:
    {
        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model("Record",recordSchema);