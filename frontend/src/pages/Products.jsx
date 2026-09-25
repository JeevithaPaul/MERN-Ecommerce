import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Products({ products, addToCart }) {
  const [searchParams] = useSearchParams();

  const categoryFromHome = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromHome);

  const [sortOption, setSortOption] = useState("default");

  const [searchText, setSearchText] = useState("");

  const categories = [
    "All",
    "Clothing",
    "Shoes",
    "Accessories",
    "Electronics",
    "Home & Living",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchText.trim() !== "") {
      result = result.filter((product) =>
        `${product.name} ${product.description}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    if (sortOption === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    selectedCategory,
    sortOption,
    searchText,
  ]);

  return (
    <section className="products-section">

      {/* Products Heading */}
      <div className="products-heading">

        <p className="products-small-title">
          SHOP COLLECTION
        </p>

        <h2>All Products</h2>

        <p>
          Discover our latest products and find something you love.
        </p>

      </div>

      {/* Filters */}
      <div className="product-filters">

        {/* Search */}
        <div className="search-box">

          <label>Search Products</label>

          <input
            type="text"
            placeholder="🔍  Search by product name or description..."
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />

        </div>

        {/* Category */}
        <div>

          <label>Category</label>

          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

        </div>

        {/* Price Sort */}
        <div>

          <label>Sort by Price</label>

          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value)
            }
          >
            <option value="default">
              Default
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>
          </select>

        </div>

        {/* Product Count */}
        <p className="product-count">
          Showing{" "}
          <strong>{filteredProducts.length}</strong>{" "}
          products
        </p>

      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (

        <p className="no-products">
          No products found.
        </p>

      ) : (

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

              {/* Product Image */}
              <div className="product-image">

                <Link
                  to={`/products/${product._id}`}
                  className="product-link"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                {/* Stock Badge */}
                <span
                  className={
                    product.stock > 0
                      ? "stock-badge"
                      : "stock-badge out-of-stock"
                  }
                >
                  {product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>

              {/* Product Information */}
              <div className="product-info">

                <p className="category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <p className="description">
                  {product.description}
                </p>

                <span className="price">
                  £{product.price.toFixed(2)}
                </span>

              </div>

              {/* Add To Cart */}
              <div className="product-bottom">

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Products;