import { useCart } from "../context/CartContext";

function Product({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="category">{product.category}</p>

        <div className="product-bottom">
          <h3>₹{product.price.toLocaleString("en-IN")}</h3>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;  
