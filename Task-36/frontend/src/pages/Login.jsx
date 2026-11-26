import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!username.trim() || !password) {
            setMessage("Please enter username and password");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/login",
                {
                    username: username.trim(),
                    password
                }
            );

            localStorage.setItem("token", response.data.token);

            setMessage(response.data.message);

            onLogin();

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Login;
