const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const route = require("./routes");
const homeRouter = require("./routes/homeRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

// API Routes
route(app);
app.use("/api/home", homeRouter);

// Serve React build
const frontendPath = path.join(__dirname, "../../front-end");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

module.exports = app;
