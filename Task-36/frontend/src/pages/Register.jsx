import { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");

        if (username.trim().length < 3) {
            setMessage("Username must contain at least 3 characters");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must contain at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/register",
                {
                    username: username.trim(),
                    password
                }
            );

            setMessage(response.data.message);
            setUsername("");
            setPassword("");

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Account</h2>

            <form onSubmit={handleRegister}>
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
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Register;
