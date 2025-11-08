const express = require("express");
const newController = require("../controllers/newController");
const upload = require("../middlewares/upload");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", newController.getNews);
router.get("/:id", newController.getNewById);
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("imgStory"),
  newController.addNew
);
router.delete("/:id", authenticate, authorizeAdmin, newController.deleteNew);
router.patch(
  "/:id",
  authenticate,
  authorizeAdmin,
  upload.single("imgStory"),
  newController.updateNew
);

module.exports = router;
