
const express = require("express");

const {
  getWorkouts,
  createWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

// POST new workout
router.post("/", createWorkout);

// DELETE workout
router.delete("/:id", deleteWorkout);

module.exports = router;
