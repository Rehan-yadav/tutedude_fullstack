
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/todos", todoRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Todo List Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server failed:", error.message);
        process.exit(1);
    }
};

startServer();
