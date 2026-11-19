import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Payment() {
  const {
    cart,
    totalAmount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        alert("Enter a valid 16-digit card number.");
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        alert("Enter expiry date in MM/YY format.");
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        alert("Enter a valid CVV.");
        return;
      }
    }

    setMessage(
      paymentMethod === "card"
        ? "Demo payment successful! Your order has been placed."
        : "Order placed successfully with Cash on Delivery!"
    );

    // This is a frontend demo, not a real card transaction.
  };

  if (message) {
    return (
      <>
        <Navbar />

        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✓</div>

            <h1>Order Successful!</h1>

            <p>{message}</p>

            <h2>
              Total Paid: ₹{totalAmount.toLocaleString("en-IN")}
            </h2>

            <button
              onClick={() => {
                // Cart clearing can be added after order confirmation.
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="payment-page">
        <div className="payment-header">
          <p>SECURE CHECKOUT</p>
          <h1>Complete Your Payment</h1>
          <span>Review your order and choose a payment method.</span>
        </div>

        <div className="payment-layout">

          {/* Payment Form */}

          <div className="payment-form-card">
            <h2>Payment Method</h2>

            <div className="payment-options">
              <button
                type="button"
                className={
                  paymentMethod === "card" ? "active-option" : ""
                }
                onClick={() => setPaymentMethod("card")}
              >
                💳 Credit Card
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "cod" ? "active-option" : ""
                }
                onClick={() => setPaymentMethod("cod")}
              >
                📦 Cash on Delivery
              </button>
            </div>

            <form onSubmit={handlePayment}>
              {paymentMethod === "card" && (
                <>
                  <h3>Card Details</h3>

                  <label>Card Number</label>

                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    maxLength="19"
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
                    }
                    required
                  />

                  <div className="card-row">
                    <div>
                      <label>Expiry Date</label>

                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        maxLength="5"
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "").slice(0, 4);

                          if (value.length > 2) {
                            value =
                              value.slice(0, 2) +
                              "/" +
                              value.slice(2);
                          }

                          setExpiry(value);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label>CVV</label>

                      <input
                        type="password"
                        placeholder="123"
                        value={cvv}
                        maxLength="4"
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        required
                      />
                    </div>
                  </div>

                  <p className="secure-note">
                    🔒 Your card details are used only for this demo form.
                    They are not stored or processed by a payment gateway.
                  </p>
                </>
              )}

              {paymentMethod === "cod" && (
                <div className="cod-message">
                  <h3>Cash on Delivery</h3>
                  <p>
                    Pay for your order when it arrives at your doorstep.
                  </p>
                </div>
              )}

              <button type="submit" className="confirm-btn">
                {paymentMethod === "card"
                  ? "Confirm Payment"
                  : "Place Order"}{" "}
                →
              </button>
            </form>

            <button
              className="back-btn"
              onClick={() => navigate("/")}
            >
              ← Back to Shopping
            </button>
          </div>

          {/* Order Summary */}

          <div className="order-summary">
            <h2>Order Summary</h2>

            {cart.length === 0 ? (
              <div>
                <p>Your cart is empty.</p>

                <button onClick={() => navigate("/")}>
                  Go Shopping
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="summary-details">
                      <h4>{item.name}</h4>

                      <p>
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                        >
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

                <div className="summary-total">
                  <div>
                    <span>Subtotal</span>
                    <span>
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <span className="free">FREE</span>
                  </div>

                  <hr />

                  <div className="grand-total">
                    <strong>Total</strong>
                    <strong>
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Payment;     
