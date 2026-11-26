
import { useEffect, useState } from "react";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "./services/api";

import "./App.css";

function App() {

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch todos
    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getTodos();

            setTodos(response.data.data);

        } catch (err) {
            setError("Failed to load todos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Add Todo
    const handleAddTodo = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task title");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await createTodo({
                title: title.trim(),
                description: description.trim()
            });

            setTitle("");
            setDescription("");

            setSuccess("Todo added successfully!");

            await fetchTodos();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to create todo"
            );
        } finally {
            setSaving(false);
        }
    };

    // Delete Todo
    const handleDelete = async (id) => {

        try {
            setError("");
            setSuccess("");

            await deleteTodo(id);

            setSuccess("Todo deleted successfully!");

            await fetchTodos();

        } catch (err) {
            setError("Unable to delete todo");
        }
    };

    // Toggle Todo
    const handleToggle = async (todo) => {

        try {
            setError("");
            setSuccess("");

            await updateTodo(todo._id, {
                completed: !todo.completed
            });

            setSuccess("Todo status updated!");

            await fetchTodos();

        } catch (err) {
            setError("Unable to update todo");
        }
    };

    // Edit Todo
    const handleEdit = async (todo) => {

        const newTitle = prompt(
            "Enter new title:",
            todo.title
        );

        if (newTitle === null) return;

        if (!newTitle.trim()) {
            setError("Title cannot be empty");
            return;
        }

        try {
            setError("");
            setSuccess("");

            await updateTodo(todo._id, {
                title: newTitle.trim()
            });

            setSuccess("Todo updated successfully!");

            await fetchTodos();

        } catch (err) {
            setError("Unable to edit todo");
        }
    };

    // Search
    const filteredTodos = todos.filter((todo) =>
        todo.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="app">

            <div className="container">

                <h1>My Todo List</h1>

                <p className="subtitle">
                    Manage your daily tasks
                </p>

                {/* Add Form */}

                <form
                    onSubmit={handleAddTodo}
                    className="todo-form"
                >

                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                    />

                    <input
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit" disabled={saving}>
                        {saving ? "Adding..." : "Add Todo"}
                    </button>

                </form>

                {/* Messages */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success">
                        {success}
                    </div>
                )}

                {/* Search */}

                <input
                    className="search"
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Todo List */}

                {loading ? (

                    <p className="loading">
                        Loading todos...
                    </p>

                ) : (

                    <div className="todo-list">

                        {filteredTodos.length === 0 ? (

                            <p className="empty">
                                No todos found!
                            </p>

                        ) : (

                            filteredTodos.map((todo) => (

                                <div
                                    className="todo-card"
                                    key={todo._id}
                                >

                                    <div className="todo-info">

                                        <h3 className={
                                            todo.completed
                                                ? "completed"
                                                : ""
                                        }>
                                            {todo.title}
                                        </h3>

                                        <p>
                                            {todo.description}
                                        </p>

                                        <span>
                                            {todo.completed
                                                ? "Completed"
                                                : "Pending"}
                                        </span>

                                    </div>

                                    <div className="actions">

                                        <button
                                            onClick={() => handleToggle(todo)}
                                        >
                                            {todo.completed
                                                ? "Undo"
                                                : "Complete"}
                                        </button>

                                        <button
                                            onClick={() => handleEdit(todo)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete"
                                            onClick={() => handleDelete(todo._id)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default App;
   
