const express = require("express");
const cartController = require("../controllers/cartController.js");
const { authenticate } = require("../middlewares/authMiddleware.js");

const Router = express.Router();
Router.use(authenticate);

Router.get("/", cartController.getCartByUser);
Router.post("/", cartController.addToCart);
Router.delete("/:productId", cartController.removeFromCart);

module.exports = Router;
