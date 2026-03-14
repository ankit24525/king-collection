const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getUsers,
  deleteUser,
  getDashboardStats,
  getOrders
} = require("../controllers/adminController");

/* USERS */
router.get("/users", protect, adminOnly, getUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

/* DASHBOARD */
router.get("/dashboard", protect, adminOnly, getDashboardStats);

/* ORDERS */
router.get("/orders", protect, adminOnly, getOrders);

module.exports = router;