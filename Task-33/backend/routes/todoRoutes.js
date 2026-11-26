
const express = require("express");

const router = express.Router();

const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    removeTodo
} = require("../controllers/todoController");

// Routes
router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", removeTodo);

module.exports = router;
