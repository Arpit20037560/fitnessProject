const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./config/dbConfig");

require("dotenv").config();


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://fitnessproject-b8ckarguh0hvehg4.uksouth-01.azurewebsites.net", // Update to your deployed domain
    credentials: true,
  })
);

// Routers
const authRouter = require("./routers/authRouter");
const workoutRouter = require("./routers/workoutRouter");
const recordRouter = require("./routers/recordRouter");

app.use("/auth", authRouter);
app.use("/", workoutRouter);
app.use("/record", recordRouter);

// Serve React Frontend
app.use(express.static(path.join(__dirname, "fitnessweb", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "fitnessweb", "build", "index.html"));
});

// Database Connection and Server Start
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`My Fitness App started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed: " + err.message);
  });
