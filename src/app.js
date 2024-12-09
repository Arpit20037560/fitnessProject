const connectDB = require("./config/dbConfig");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}));

const authRouter = require("./routers/authRouter"); 
const workoutRouter = require("./routers/workoutRouter");
const recordRouter = require("./routers/recordRouter");

app.use("/auth", authRouter); 
app.use("/",workoutRouter);
app.use("/record",recordRouter)

//AZURE Setup
app.use(express.static("./fitnessweb/build"));
app.get("*",(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"fitnessweb","build","index.html"))
})


connectDB().then(() => {
    app.listen(3000, () => {
        console.log("My Fitness App started at port 3000");
    });
}).catch((err) => {
    console.log("DB connection failed: " + err.message);
});