import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";

function AppContent() {
  const location = useLocation();

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products
  useEffect(() => {
    fetch("https://mern-ecommerce-5nju.vercel.app/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Hide footer on Login and Sign Up
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="app">

      {/* Navbar */}

      <header className="navbar">

        <Link
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          <span>Shop</span>
          <span>Ease</span>
        </Link>

        {/* Mobile Hamburger */}

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation */}

        <nav className={menuOpen ? "mobile-nav open" : "mobile-nav"}>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartCount})
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="signup-button"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </nav>

      </header>

      {/* Pages */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={
            <Products
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails
              products={products}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/orders"
          element={<MyOrders />}
        />

      </Routes>

      {/* Footer */}

      {!hideFooter && (
        <footer className="main-footer">

          <div className="footer-container">

            {/* ShopEase */}

            <div className="footer-column footer-about">

              <h2>
                Shop<span>Ease</span>
              </h2>

              <p>
                Quality products for your everyday lifestyle,
                all in one place. Shop with ease and discover
                something you'll love.
              </p>

              <div className="footer-socials">

                <a href="#" aria-label="Facebook">
                  f
                </a>

                <a href="#" aria-label="Instagram">
                  ◎
                </a>

                <a href="#" aria-label="LinkedIn">
                  in
                </a>

                <a href="#" aria-label="YouTube">
                  ▶
                </a>

              </div>

            </div>

            {/* Shop */}

            <div className="footer-column">

              <h3>Shop</h3>

              <Link to="/products">
                All Products
              </Link>

              <Link to="/products?category=Clothing">
                Clothing
              </Link>

              <Link to="/products?category=Shoes">
                Shoes
              </Link>

              <Link to="/products?category=Accessories">
                Accessories
              </Link>

              <Link to="/products?category=Electronics">
                Electronics
              </Link>

            </div>

            {/* Customer Care */}

            <div className="footer-column">

              <h3>Customer Care</h3>

              <Link to="/orders">
                My Orders
              </Link>

              <Link to="/cart">
                Shopping Cart
              </Link>

              <Link to="/checkout">
                Checkout
              </Link>

              <Link to="/products">
                Help & Support
              </Link>

            </div>

            {/* Contact */}

            <div className="footer-column">

              <h3>Contact</h3>

              <p>✉️ support@shopease.com</p>
              <p>📞 +44 1234 567890</p>
              <p>📍 United Kingdom</p>

            </div>

          </div>

          <div className="footer-bottom">

            <p>
              © 2026 ShopEase. All Rights Reserved.
            </p>

          </div>

        </footer>
      )}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;