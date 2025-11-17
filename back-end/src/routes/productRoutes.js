const express = require("express");
const ProductController = require("../controllers/productController");
const upload = require("../middlewares/upload");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", ProductController.getAllProduct);
router.get("/search", ProductController.searchProduct);
router.get("/:id", ProductController.getProductById);

// Thêm sản phẩm
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("Img"),
  ProductController.addProduct
);

// Cập nhật sản phẩm (có thể upload ảnh mới)
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  upload.single("Img"),
  ProductController.updateProduct
);

// Xóa sản phẩm
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  ProductController.deleteProduct
);

module.exports = router;
