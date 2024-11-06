const mongoose = require('mongoose');

const connectDB = async () =>
{
    try 
    {
        mongoose.connect("mongodb+srv://Arpit196:Gelhu30080@mongodev.uohce.mongodb.net/fitnessTracker");
        console.log("MongoDB connected");
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}

module.exports = connectDB;