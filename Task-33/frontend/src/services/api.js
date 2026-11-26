
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Get all todos
export const getTodos = () => API.get("/todos");

// Create todo
export const createTodo = (data) => API.post("/todos", data);

// Update todo
export const updateTodo = (id, data) =>
    API.put(`/todos/${id}`, data);

// Delete todo
export const deleteTodo = (id) =>
    API.delete(`/todos/${id}`);

export default API;
