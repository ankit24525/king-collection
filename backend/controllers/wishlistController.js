const Wishlist = require("../models/wishlistModel");
const Product = require("../models/Product");


// ✅ GET USER WISHLIST
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id })
      .populate("product");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ✅ ADD / REMOVE (TOGGLE)
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const exist = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    // REMOVE if exists
    if (exist) {
      await exist.deleteOne();
      return res.json({ msg: "Removed from wishlist" });
    }

    // ADD if not exists
    await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    res.json({ msg: "Added to wishlist" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};