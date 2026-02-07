const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

pool.connect()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("DB connection error", err));

app.use(cors());
app.use(express.json());


// Auth Routes
app.use("/auth", authRoutes);

// Content Routes
app.use("/content", contentRoutes);


// Protected Dashboard Route
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });
});


// Root Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


