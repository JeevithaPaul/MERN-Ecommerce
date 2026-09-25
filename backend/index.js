require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const app = express();
const jwt = require("jsonwebtoken");



app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    // Database Checking 
    console.log("Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Home route
app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});


// Sample products
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});

//Signup API
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("Signup Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

//Login API 
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Order API 
app.post("/api/orders", async (req, res) => {
  try {
    const {
      customerName,
      email,
      address,
      city,
      postcode,
      items,
      totalAmount,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !address ||
      !city ||
      !postcode ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "All order details are required",
      });
    }

    const order = new Order({
      customerName,
      email,
      address,
      city,
      postcode,
      items,
      totalAmount,
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Order Error:", error);

    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

// Get My Orders
app.get("/api/orders", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const orders = await Order.find({ email }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});