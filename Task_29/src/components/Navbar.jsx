import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        STEP<span>UP</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#products">Categories</a>
        <a href="#about">About Us</a>
      </div>

      <Link to="/" className="cart-link">
        🛒 Cart ({count})
      </Link>
    </nav>
  );
}

export default Navbar;
