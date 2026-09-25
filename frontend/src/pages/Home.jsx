import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  const categories = [
    "Clothing",
    "Shoes",
    "Accessories",
    "Electronics",
    "Home & Living",
  ];

  useEffect(() => {
    fetch("https://mern-ecommerce-5nju.vercel.appapi/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching featured products:", error);
      });
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}

      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-title">WELCOME TO SHOPEASE</p>

          <h2>
            Discover Your <span>Style</span>
          </h2>

          <p className="hero-description">
            Shop quality products for your everyday lifestyle, all in one
            place.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="shop-button">
              Shop Now
            </Link>

            <a href="#categories" className="explore-button">
              Explore Categories
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
            alt="ShopEase shopping"
          />
        </div>
      </section>

      {/* Benefits Section */}

      <section className="benefits-section">
        <div className="benefit-card">
          <div className="benefit-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Quick and reliable delivery to your doorstep.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🔒</div>
          <h3>Secure Shopping</h3>
          <p>Your account and shopping experience are protected.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🛒</div>
          <h3>Easy Checkout</h3>
          <p>A simple and convenient checkout process.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">⭐</div>
          <h3>Quality Products</h3>
          <p>Carefully selected products for everyday needs.</p>
        </div>
      </section>

      {/* Categories Section */}

      <section className="categories-section" id="categories">
        <p className="section-small-title">
          EXPLORE OUR COLLECTION
        </p>

        <h2>Shop by Category</h2>

        <p className="section-description">
          Find everything you need across our popular categories.
        </p>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="category-card"
            >
              <div className="category-icon">
                {category === "Clothing" && "👕"}
                {category === "Shoes" && "👟"}
                {category === "Accessories" && "👜"}
                {category === "Electronics" && "💻"}
                {category === "Home & Living" && "🏠"}
              </div>

              <h3>{category}</h3>

              <p>Explore {category} →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Loop Section */}

      <section className="brand-loop-section">
        <div className="brand-loop">
          <div className="brand-track">
            <span>URBANWEAR</span>
            <span>SOLESTYLE</span>
            <span>TECHNOVA</span>
            <span>HOMECRAFT</span>
            <span>EVERYDAY</span>
            <span>MODERN LIVING</span>

            <span>URBANWEAR</span>
            <span>SOLESTYLE</span>
            <span>TECHNOVA</span>
            <span>HOMECRAFT</span>
            <span>EVERYDAY</span>
            <span>MODERN LIVING</span>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}

      <section className="featured-section">
        <p className="section-small-title">
          OUR TOP PICKS
        </p>

        <h2>Featured Products</h2>

        <p className="section-description">
          Discover some of our popular products.
        </p>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div className="featured-card" key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="featured-link"
              >
                <div className="featured-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="featured-info">
                  <p className="featured-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <p className="featured-price">
                    £{product.price.toFixed(2)}
                  </p>

                  <p className="featured-stock">
                    {product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>
                </div>
              </Link>

              <Link
                to={`/products/${product._id}`}
                className="featured-button"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>

        <Link
          to="/products"
          className="view-all-button"
        >
          View All Products →
        </Link>
      </section>

      {/* Newsletter Section - HOME ONLY */}

      <section className="newsletter-section">
        <div className="newsletter-content">
          <p className="newsletter-small-title">
            STAY CONNECTED
          </p>

          <h2>Stay Updated with ShopEase</h2>

          <p>
            Subscribe to get updates about new products,
            special offers and more.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button type="button">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;