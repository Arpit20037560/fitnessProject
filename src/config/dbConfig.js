const mongoose = require('mongoose');

const connectDB = async () =>
{
    try 
    {
        mongoose.connect("mongodb+srv://arpit196:arpitbeuria@cluster0.uohce.mongodb.net/fitnessTracker");
        console.log("MongoDB connected");
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}

module.exports = connectDB;