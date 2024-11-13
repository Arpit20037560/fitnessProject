const connectDB = require("./config/dbConfig");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./controllers/authController"); 
app.use("/auth", authRouter); 

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("My Fitness App started at port 3000");
    });
}).catch((err) => {
    console.log("DB connection failed: " + err.message);
});