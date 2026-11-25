const express = require("express");

const router = express.Router();

const {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
} = require("../controllers/taskController");

router.post("/", addTask);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", updateTaskStatus);

module.exports = router;
