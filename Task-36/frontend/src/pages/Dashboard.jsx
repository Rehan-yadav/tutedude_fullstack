import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ onLogout }) {
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    onLogout();
                    return;
                }

                const response = await axios.get(
                    "http://localhost:5000/protected",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setMessage(response.data.message);
                setUser(response.data.user);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Unable to access dashboard"
                );

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    localStorage.removeItem("token");
                    onLogout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProtectedData();
    }, [onLogout]);

    if (loading) {
        return <h2>Loading Dashboard...</h2>;
    }

    return (
        <div>
            <h1>Dashboard</h1>

            {message && <h3>{message}</h3>}

            {user && (
                <p>Welcome, {user.username}!</p>
            )}

            {error && <p>{error}</p>}

            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
