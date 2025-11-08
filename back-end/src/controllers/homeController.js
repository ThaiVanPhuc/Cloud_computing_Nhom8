const HomeProduct = require("../models/home"); 

class HomeController {
  async getAllHomeProduct(req, res) {
    try {
      const products = await HomeProduct.find();
      res.json(products);
    } catch (error) {
      console.error("Get Products Error:", error);
      res.status(500).json({ message: "Server error while getting products" });
    }
  }
}

module.exports = new HomeController();
