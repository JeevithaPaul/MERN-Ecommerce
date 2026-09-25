import { Link } from "react-router-dom";

function Cart({
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
}) {
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <section className="cart-section">
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>

                    <h2>Your Cart is Empty</h2>

                    <p>
                        Looks like you haven't added anything to your cart yet.
                    </p>

                    <Link
                        to="/products"
                        className="continue-shopping"
                    >
                        Continue Shopping →
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="cart-section">
            <div className="cart-container">

                <h2>Your Cart</h2>

                {cart.map((item) => (
                    <div className="cart-item" key={item._id}>

                        <img
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="cart-item-info">
                            <h3>{item.name}</h3>

                            <p>
                                £{item.price.toFixed(2)}
                            </p>

                            <div className="quantity-controls">
                                <button
                                    onClick={() =>
                                        decreaseQuantity(item._id)
                                    }
                                >
                                    −
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item._id)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="remove-button"
                                onClick={() =>
                                    removeFromCart(item._id)
                                }
                            >
                                Remove
                            </button>
                        </div>

                        <strong>
                            £{(item.price * item.quantity).toFixed(2)}
                        </strong>

                    </div>
                ))}

                <div className="cart-total">
                    <h3>
                        Total: £{totalPrice.toFixed(2)}
                    </h3>
                </div>

                <Link
                    to="/checkout"
                    className="checkout-button"
                >
                    Proceed to Checkout
                </Link>

            </div>
        </section>
    );
}

export default Cart;