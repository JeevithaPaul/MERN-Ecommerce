import { useState } from "react";

function Checkout({ cart, setCart }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderItems = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: name,
            email,
            address,
            city,
            postcode,
            items: orderItems,
            totalAmount: total,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCart([]);
        setOrderPlaced(true);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log("Order Error:", error);
      setMessage(
        "Something went wrong while placing the order"
      );
    }
  };

  if (orderPlaced) {
    return (
      <section className="checkout-section">
        <div className="checkout-container">
          <h2>Order Placed Successfully!</h2>
          <p>{message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="checkout-container">

        <div className="checkout-form">
          <h2>Checkout</h2>

          <form onSubmit={handleSubmit}>

            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="off"
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="off"
            />

            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              autoComplete="street-address"
            />

            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
              autoComplete="address-level2"
            />

            <label>Postcode</label>
            <input
              type="text"
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              required
              autoComplete="postal-code"
            />

            <button type="submit">
              Place Order
            </button>
          </form>

          {message && <p>{message}</p>}
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item._id}>
              <p>
                {item.name} × {item.quantity}
              </p>

              <p>
                £{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <h3>
            Total: £{total.toFixed(2)}
          </h3>
        </div>

      </div>
    </section>
  );
}

export default Checkout;