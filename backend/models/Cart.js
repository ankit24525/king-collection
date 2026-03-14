const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        qty: {
          type: Number,
          default: 1,
        },

        size: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema);