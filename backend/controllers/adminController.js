const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/order");

/* GET USERS */
exports.getUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ msg: error.message });

  }

};


/* DELETE USER */
exports.deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();

    res.json({ msg: "User deleted successfully" });

  } catch (error) {

    res.status(500).json({ msg: error.message });

  }

};


/* ADMIN DASHBOARD STATS */
exports.getDashboardStats = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCarts = await Cart.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      users: totalUsers,
      products: totalProducts,
      carts: totalCarts,
      orders: totalOrders
    });

  } catch (error) {

    res.status(500).json({ msg: error.message });

  }

};


/* GET ALL ORDERS */
exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find().populate("user", "name email");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ msg: error.message });

  }

};