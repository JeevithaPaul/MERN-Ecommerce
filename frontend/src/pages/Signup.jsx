import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://mern-ecommerce-5nju.vercel.appapi/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log("Signup Error:", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="auth-page">

      <div className="auth-heading">
        <div className="auth-icon">🛍️</div>

        <h1>Create Account</h1>

        <p>Join ShopEase and start shopping today.</p>
      </div>

      <div className="auth-container">

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <p className="password-hint">
            Password must be at least 6 characters.
          </p>

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            required
          />

          <button type="submit" className="auth-button">
            Create Account
          </button>

        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <div className="auth-divider"></div>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </section>
  );
}

export default Signup;