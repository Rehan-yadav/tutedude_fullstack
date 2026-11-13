import { useState } from "react";
import "./App.css";

function App() {
  const shoes = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 4999,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 5999,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },
    {
      id: 3,
      name: "Running Sneakers",
      price: 2999,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },
    {
      id: 4,
      name: "Casual Shoes",
      price: 2499,
      image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500"
    },
    {
      id: 5,
      name: "Nike Sports Shoes",
      price: 3999,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },
    {
      id: 6,
      name: "Classic Sneakers",
      price: 1999,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === shoe.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...shoe, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>👟</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      <section className="products-section" id="home">
        <div id="categories"></div>

        <div className="shoe-grid">
          {shoes.map((shoe) => (
            <div className="shoe-card" key={shoe.id}>
              <img src={shoe.image} alt={shoe.name} />

              <h3>{shoe.name}</h3>

              <p className="price">
                ₹{shoe.price.toLocaleString("en-IN")}
              </p>

              <button onClick={() => addToCart(shoe)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart-section" id="cart">
        <h2>Shopping Cart 🛒</h2>

        <p className="cart-subtitle">
          Your Selected Products ({totalItems} items)
        </p>

        {cart.length === 0 ? (
          <p className="empty">Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>

                <p>
                  Price: ₹{item.price.toLocaleString("en-IN")}
                </p>

                <p>Quantity: {item.quantity}</p>
              </div>

              <div className="quantity-buttons">
                <button onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => addToCart(item)}>
                  +
                </button>
              </div>
            </div>
          ))
        )}

        <div className="total">
          <h3>
            Total: ₹{totalPrice.toLocaleString("en-IN")}
          </h3>
        </div>
      </section>
      
    </div>
  );
}

export default App;
