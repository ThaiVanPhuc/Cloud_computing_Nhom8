const express = require("express");
const ProductController = require("../controllers/productController.js");
const upload = require("../middlewares/upload");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", ProductController.getAllProduct);
router.get("/search", ProductController.searchProduct);

router.get("/:id", ProductController.getProductById);
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("Img"),
  ProductController.addProduct
);

router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  ProductController.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  ProductController.deleteProduct
);

module.exports = router;
