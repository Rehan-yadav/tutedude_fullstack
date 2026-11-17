import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">MyBlog</div>

      <div className="nav-center">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>

      <div className="nav-right">
        <NavLink to="/login" className="login-btn">
          Login
        </NavLink>

        <NavLink to="/signup" className="signup-btn">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
