import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`https://mern-ecommerce-5nju.vercel.app/api/orders?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <section className="orders-section">
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="orders-section">
        <div className="orders-empty">
          <div className="order-icon">📦</div>

          <h2>No Orders Yet</h2>

          <p>
            Your orders will appear here after you make a purchase.
          </p>

          <Link to="/products" className="orders-button">
            Start Shopping →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-section">
      <div className="orders-container">
        <h2>My Orders</h2>

        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <h3>Order #{order._id.slice(-6)}</h3>
                <p>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="order-status">
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div className="order-item" key={index}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      £{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <strong>
                    £{(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="order-total">
              Total: £{order.totalAmount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyOrders;