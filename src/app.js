const connectDB = require("./config/dbConfig");
const express = require("express");
const app = express();

connectDB().then(()=>
{
    app.listen(3000,()=>{
        console.log("My Fitness App started at portno 3000");
    })
}).catch((err)=>
{
    console.log("DB connection Failed"+ err.message);
})