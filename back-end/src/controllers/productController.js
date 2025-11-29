const Product = require("../models/Product");

class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error("Get Products Error:", error);
      res.status(500).json({ message: "Server error while getting products" });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      console.error("Get Product By ID Error:", error);
      res
        .status(500)
        .json({ message: "Server error while getting product by ID" });
    }
  }

 async addProduct(req, res) {
  try {
    const { Title, Cat, Price, Description } = req.body;

    // Ép kiểu Price về Number và validate
    const priceNumber = Number(Price);
    if (isNaN(priceNumber)) {
      return res.status(400).json({ message: "Price phải là số hợp lệ" });
    }

    const Img = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      Title,
      Cat,
      Price: priceNumber,
      Description,
      Img,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
}


  async updateProduct(req, res) {
    try {
      const updateData = { ...req.body };

      if (req.file) {
        updateData.Img = `/uploads/${req.file.filename}`;
      } else {
        if (updateData.Img && typeof updateData.Img === "object")
          delete updateData.Img;
      }

      delete updateData._id;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });

      res.json(updatedProduct);
    } catch (error) {
      console.error("Update Product Error:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete Product Error:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  }

  async searchProduct(req, res) {
    try {
      const keyword = req.query.search;
      if (!keyword || keyword.trim() === "")
        return res.status(400).json({ message: "Missing search keyword" });

      const products = await Product.find({
        $or: [
          { Title: { $regex: keyword, $options: "i" } },
          { Description: { $regex: keyword, $options: "i" } },
        ],
      });

      res.json(products);
    } catch (error) {
      console.error("Search Product Error:", error);
      res.status(500).json({ message: "Failed to search product" });
    }
  }
}

module.exports = new ProductController();
