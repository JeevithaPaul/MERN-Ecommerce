require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // Clothing
  {
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Clothing",
    stock: 50,
  },
  {
    name: "Comfort Hoodie",
    description: "Soft and warm hoodie for casual everyday wear.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    category: "Clothing",
    stock: 30,
  },
  {
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans made for everyday comfort.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    category: "Clothing",
    stock: 25,
  },
  {
    name: "Casual Dress",
    description: "Elegant and comfortable dress for everyday occasions.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    category: "Clothing",
    stock: 20,
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with a comfortable everyday fit.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    category: "Clothing",
    stock: 20,
  },

  // Shoes
  {
    name: "Classic Sneakers",
    description: "Comfortable sneakers suitable for everyday activities.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Shoes",
    stock: 35,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with comfortable cushioning.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    category: "Shoes",
    stock: 25,
  },
  {
    name: "Casual Sandals",
    description: "Light and comfortable sandals for warm days.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306",
    category: "Shoes",
    stock: 40,
  },
  {
    name: "Sports Trainers",
    description: "Lightweight trainers designed for comfortable daily movement.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    category: "Shoes",
    stock: 25,
  },

  // Accessories
  {
    name: "Everyday Backpack",
    description: "Spacious backpack perfect for work, study and travel.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accessories",
    stock: 30,
  },
  {
    name: "Classic Watch",
    description: "Simple and stylish watch for everyday use.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    category: "Accessories",
    stock: 15,
  },
  {
    name: "Sunglasses",
    description: "Stylish sunglasses with a modern frame.",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Accessories",
    stock: 35,
  },
  {
    name: "Leather Wallet",
    description: "Compact leather wallet with multiple card slots.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "Accessories",
    stock: 30,
  },

  // Electronics
  {
    name: "Wireless Headphones",
    description: "Wireless headphones with clear and comfortable sound.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Smart Watch",
    description: "Modern smartwatch for everyday activities and fitness.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Portable Speaker",
    description: "Compact wireless speaker for music anywhere.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Bluetooth Earbuds",
    description: "Compact wireless earbuds with clear sound and a charging case.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    category: "Electronics",
    stock: 25,
  },

  // Home & Living
  {
    name: "Table Lamp",
    description: "Minimal table lamp for a warm and modern home.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "Home & Living",
    stock: 25,
  },
  {
    name: "Decorative Cushion",
    description: "Soft decorative cushion to add comfort and style.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    category: "Home & Living",
    stock: 40,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Simple ceramic mug perfect for coffee, tea and hot drinks.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: "Home & Living",
    stock: 50,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products added successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.log("Seed Error:", error);
  }
}

seedProducts();