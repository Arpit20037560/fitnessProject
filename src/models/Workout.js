const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    name:
    {
        type:String,
        required: true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    duration:
    {
        type:Number,
        required:true
    },
    intensity:
    {
        type:String,
        enum:['low','medium','high'],
        required:true
    },
    notes:
    {
        type:String
    }
},
{timestamps:true}
)

module.exports = mongoose.model('Workout',workoutSchema);