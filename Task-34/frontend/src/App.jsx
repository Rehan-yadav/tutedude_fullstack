import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/posts");
            const data = await response.json();

            if (response.ok) {
                setPosts(data);
            } else {
                setMessage(data.message || "Could not load posts.");
            }
        } catch (error) {
            setMessage("Could not connect to the backend.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleUserSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email })
            });

            const data = await response.json();

            if (response.ok) {
                setUserId(data.user._id);
                setMessage(`User created! ID: ${data.user._id}`);
                setName("");
                setEmail("");
            } else {
                setMessage(data.message || "Could not create user.");
            }
        } catch (error) {
            setMessage("Could not connect to the backend.");
        }
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, userId })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Post created successfully!");
                setTitle("");
                setContent("");
                await fetchPosts();
            } else {
                setMessage(data.message || "Could not create post.");
            }
        } catch (error) {
            setMessage("Could not connect to the backend.");
        }
    };

    const handleDelete = async (postId) => {
        setMessage("");

        try {
            const response = await fetch(
                `http://localhost:5000/posts/${postId}`,
                { method: "DELETE" }
            );
            const data = await response.json();

            if (response.ok) {
                setMessage("Post deleted successfully!");
                await fetchPosts();
            } else {
                setMessage(data.message || "Could not delete post.");
            }
        } catch (error) {
            setMessage("Could not connect to the backend.");
        }
    };

    const startEditing = (post) => {
        setEditingId(post._id);
        setEditTitle(post.title);
        setEditContent(post.content);
        setMessage("");
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await fetch(
                `http://localhost:5000/posts/${editingId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: editTitle,
                        content: editContent
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Post updated successfully!");
                setEditingId(null);
                await fetchPosts();
            } else {
                setMessage(data.message || "Could not update post.");
            }
        } catch (error) {
            setMessage("Could not connect to the backend.");
        }
    };

    return (
        <main className="app">
            <header className="page-header">
                <h1>Post Management</h1>
                <p>Create and manage your posts in one place.</p>
            </header>

            <section className="forms-grid">
                <div className="card">
                    <h2>Create a User</h2>
                    <form onSubmit={handleUserSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter user name"
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email address"
                            required
                        />

                        <button type="submit">Create User</button>
                    </form>
                </div>

                <div className="card">
                    <h2>Create a Post</h2>
                    <form onSubmit={handlePostSubmit}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Enter post title"
                            required
                        />

                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder="Write your post..."
                            required
                        />

                        <label htmlFor="userId">User ID</label>
                        <input
                            id="userId"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            placeholder="Create a user to fill this automatically"
                            required
                        />

                        <button type="submit">Create Post</button>
                    </form>
                </div>
            </section>

            {message && <p className="message">{message}</p>}

            <section className="posts-section">
                <h2>All Posts</h2>

                {posts.length === 0 ? (
                    <p className="empty-message">No posts found.</p>
                ) : (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <article className="post-card" key={post._id}>
                                {editingId === post._id ? (
                                    <form onSubmit={handleUpdate}>
                                        <label>Title</label>
                                        <input
                                            value={editTitle}
                                            onChange={(event) =>
                                                setEditTitle(event.target.value)
                                            }
                                            required
                                        />

                                        <label>Content</label>
                                        <textarea
                                            value={editContent}
                                            onChange={(event) =>
                                                setEditContent(event.target.value)
                                            }
                                            required
                                        />

                                        <div className="button-row">
                                            <button type="submit">
                                                Save Changes
                                            </button>
                                            <button
                                                className="secondary-button"
                                                type="button"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h3>{post.title}</h3>
                                        <p className="post-content">{post.content}</p>
                                        <p className="post-author">
                                            Posted by:{" "}
                                            {post.user ? post.user.name : "Unknown user"}
                                        </p>

                                        <div className="button-row">
                                            <button
                                                type="button"
                                                onClick={() => startEditing(post)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                type="button"
                                                onClick={() => handleDelete(post._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default App;
