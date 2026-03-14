const Cart = require("../models/cartModel");

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { productId, qty, selectedSize } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const existItem = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (existItem) {
    existItem.qty += qty;
  } else {
    cart.items.push({
      product: productId,
      qty,
      selectedSize,
    });
  }

  await cart.save();

  res.json({
    items: cart.items,
  });
};

// GET CART
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  res.json(cart || { items: [] });
};

// UPDATE QTY
exports.updateQty = async (req, res) => {
  const { productId } = req.params;
  const { type } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (type === "inc") item.qty += 1;
  if (type === "dec" && item.qty > 1) item.qty -= 1;

  await cart.save();

  res.json({
    items: cart.items,
  });
};

// REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.json({
    items: cart.items,
  });
};