const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) =>
        console.log("MongoDB connection error:", error.message)
    );

// Add a new user
app.post("/users", async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User added successfully!",
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new post
app.post("/posts", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            user: req.body.userId
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: "Post added successfully!",
            post: savedPost
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all posts with user details
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a post by its ID
app.put("/posts/:id", async (req, res) => {
    try {
        const postId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post updated successfully!",
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a post by its ID
app.delete("/posts/:id", async (req, res) => {
    try {
        const postId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post deleted successfully!",
            post: deletedPost
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
