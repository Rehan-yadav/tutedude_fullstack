const { randomUUID } = require("crypto");

let tasks = [];

const addTask = (req, res) => {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: randomUUID(),
        title: title.trim(),
        description: description || "",
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
};

const getAllTasks = (req, res) => {
    res.status(200).json({
        message: "Tasks retrieved successfully",
        tasks: tasks
    });
};

const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task retrieved successfully",
        task: task
    });
};

const updateTask = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Title must be a non-empty string"
            });
        }

        task.title = title.trim();
    }

    if (description !== undefined) {
        task.description = description;
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }

        task.completed = completed;
    }

    res.status(200).json({
        message: "Task updated successfully",
        task: task
    });
};

const deleteTask = (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully"
    });
};

const updateTaskStatus = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { completed } = req.body;

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be true or false"
        });
    }

    task.completed = completed;

    res.status(200).json({
        message: "Task status updated successfully",
        task: task
    });
};

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
};
