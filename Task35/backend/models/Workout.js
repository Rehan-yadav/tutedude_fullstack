
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter workout title"],
      trim: true,
    },

    load: {
      type: Number,
      required: [true, "Please enter workout load"],
    },

    reps: {
      type: Number,
      required: [true, "Please enter workout reps"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
