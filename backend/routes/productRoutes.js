const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


// PUBLIC ROUTES

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/:id", getProductById);


// ADMIN ROUTES

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 10),
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 10),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;