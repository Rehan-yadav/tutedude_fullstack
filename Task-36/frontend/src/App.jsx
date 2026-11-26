import { useState, useCallback } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setShowRegister(false);
    }, []);

    if (isLoggedIn) {
        return (
            <div className="app-container">
                <Dashboard onLogout={handleLogout} />
            </div>
        );
    }

    return (
        <div className="app-container">
            {showRegister ? (
                <>
                    <Register />

                    <p>Already have an account?</p>

                    <button onClick={() => setShowRegister(false)}>
                        Go to Login
                    </button>
                </>
            ) : (
                <>
                    <Login onLogin={handleLogin} />

                    <p>Don't have an account?</p>

                    <button onClick={() => setShowRegister(true)}>
                        Create Account
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
