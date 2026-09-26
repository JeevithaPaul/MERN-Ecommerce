import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://mern-ecommerce-5nju.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setIsLoggedIn(true);

        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="auth-page">

      <div className="auth-heading">

        <div className="auth-icon">
          🛍️
        </div>

        <h1>Welcome Back</h1>

        <p>
          Login to continue shopping with ShopEase.
        </p>

      </div>

      <div className="auth-container">

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        {message && <p>{message}</p>}

        <div className="auth-divider"></div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <a href="/signup">
            Create Account
          </a>
        </p>

      </div>

      <p className="secure-text">
        🔒 Secure authentication
      </p>

    </section>
  );
}

export default Login;