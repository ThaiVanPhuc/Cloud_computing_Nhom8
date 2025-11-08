const Cart = require("../models/Cart");

class CartController {
  static async getCartByUser(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ userId }).populate("items.product");
      if (!cart) {
        return res.status(200).json({ userId, items: [] });
      }

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  static async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, qty } = req.body;

      if (!productId || !qty) {
        return res.status(400).json({ message: "Missing productId or qty" });
      }

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const index = cart.items.findIndex((item) =>
        item.product.equals(productId)
      );
      if (index > -1) {
        cart.items[index].qty += qty;
      } else {
        cart.items.push({ product: productId, qty });
      }

      await cart.save();
      const populatedCart = await Cart.findById(cart._id).populate(
        "items.product"
      );
      res.status(200).json(populatedCart);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  static async removeFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.items = cart.items.filter((item) => !item.product.equals(productId));
      await cart.save();

      const updatedCart = await Cart.findById(cart._id).populate(
        "items.product"
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

module.exports = CartController;
