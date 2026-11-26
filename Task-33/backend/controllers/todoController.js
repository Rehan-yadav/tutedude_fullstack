
const todoService = require("../services/todoService");

// GET all todos
const getTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();

        res.status(200).json({
            success: true,
            data: todos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET single todo
const getTodo = async (req, res) => {
    try {
        const todo = await todoService.getTodoById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE todo
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await todoService.createTodo({
            title,
            description
        });

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE todo
const updateTodo = async (req, res) => {
    try {
        const todo = await todoService.updateTodo(
            req.params.id,
            req.body
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE todo
const removeTodo = async (req, res) => {
    try {
        const todo = await todoService.deleteTodo(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    removeTodo
};
