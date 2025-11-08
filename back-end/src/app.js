const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const route = require("./routes");
const homeRouter = require("./routes/homeRoutes");
const productRouter = require("./routes/productRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static folder for product images
app.use(express.static("public"));
// Serve static files (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
route(app);

app.use("/api/home", homeRouter);
app.use("/", productRouter);
module.exports = app;
