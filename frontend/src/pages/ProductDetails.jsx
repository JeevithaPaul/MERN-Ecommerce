import { useParams } from "react-router-dom";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <section className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">
        <p className="category">{product.category}</p>

        <h2>{product.name}</h2>

        <p className="details-price">
          £{product.price.toFixed(2)}
        </p>

        <p className="details-description">
          {product.description}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;