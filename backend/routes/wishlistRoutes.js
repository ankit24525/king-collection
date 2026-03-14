const express = require("express");
const router = express.Router();

const {
  getWishlist,
  toggleWishlist,
} = require("../controllers/wishlistController");

const {protect} = require("../middleware/authMiddleware");

// ✅ user must be logged in
router.get("/", protect, getWishlist);
router.post("/", protect, toggleWishlist);

module.exports = router;