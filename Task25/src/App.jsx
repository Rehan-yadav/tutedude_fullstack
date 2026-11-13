import React, { useState } from "react";
import "./App.css";

function App() {
  const shoes = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 4500,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 5500,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },
    {
      id: 3,
      name: "Puma Running Shoes",
      price: 3500,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },
    {
      id: 4,
      name: "New Balance 574",
      price: 6000,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500"
    },
    {
      id: 5,
      name: "Nike Air Jordan",
      price: 7500,
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500"
    },
    {
      id: 6,
      name: "Classic Sneakers",
      price: 2500,
      image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500"
    }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    const existingItem = cart.find((item) => item.id === shoe.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <h1>👟 ShoeStore</h1>
        <p>Find Your Perfect Pair</p>
      </header>

      <main className="container">
        <section className="products">
          <h2>Available Shoes</h2>

          <div className="product-grid">
            {shoes.map((shoe) => (
              <div className="product-card" key={shoe.id}>
                <img src={shoe.image} alt={shoe.name} />

                <div className="product-info">
                  <h3>{shoe.name}</h3>
                  <p>₹{shoe.price.toLocaleString("en-IN")}</p>

                  <button onClick={() => addToCart(shoe)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cart">
          <h2>🛒 Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toLocaleString("en-IN")}</p>

                    <div className="quantity">
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => addToCart(item)}>
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <h3>
                  Total: ₹{total.toLocaleString("en-IN")}
                </h3>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
