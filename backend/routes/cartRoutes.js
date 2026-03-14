const router = require("express").Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateQty
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:id", protect, removeFromCart);
router.put("/:id", protect, updateQty);

module.exports = router;