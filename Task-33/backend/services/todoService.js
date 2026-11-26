
const Todo = require("../models/Todo");

// Get all todos
const getAllTodos = async () => {
    return await Todo.find().sort({ createdAt: -1 });
};

// Get single todo
const getTodoById = async (id) => {
    return await Todo.findById(id);
};

// Create todo
const createTodo = async (data) => {
    return await Todo.create(data);
};

// Update todo
const updateTodo = async (id, data) => {
    return await Todo.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

// Delete todo
const deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
