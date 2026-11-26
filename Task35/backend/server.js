
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Workout Routes
const workoutRoutes = require("./routes/workoutRoutes");
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Workout Buddy API is running!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
