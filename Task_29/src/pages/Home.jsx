import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Running Shoes",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    category: "Sports Shoes",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
  },
  {
    id: 3,
    name: "Puma RS-X",
    category: "Casual Shoes",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 4,
    name: "New Balance 574",
    category: "Lifestyle Shoes",
    price: 4499,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600",
  },
  {
    id: 5,
    name: "Nike Revolution",
    category: "Running Shoes",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
  },
  {
    id: 6,
    name: "Adidas Superstar",
    category: "Casual Shoes",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
  },
];

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div>
          <p className="hero-tag">STEP INTO COMFORT</p>

          <h1>
            Find Your Perfect
            <br />
            <span>Pair of Shoes.</span>
          </h1>

          <p>
            Discover stylish and comfortable footwear
            for every step of your journey.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now →
          </a>
        </div>
      </section>

      <div className="main-layout">
        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <p>OUR COLLECTION</p>
              <h2>Explore Our Shoes</h2>
            </div>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>

        <Cart />
      </div>

      <footer id="about">
        <h2>STEPUP</h2>
        <p>Walk with confidence. Walk with style.</p>
        <p>© 2026 STEPUP. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;
