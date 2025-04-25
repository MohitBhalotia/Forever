import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  size: {
    type: String,
    required: [true, "Enter a size"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
