import { StatusCodes } from "http-status-codes";
import cartModel from "../models/cartModel.js";
import BadRequestError from "../errors/bad-request.js";
//add prdoucts to user Cart
const addToCart = async (req, res) => {
  const {
    user: { userId },
    body: { productId, size, quantity },
  } = req;
  const item = await cartModel.findOne({
    createdBy: userId,
    productId,
    size,
  });
  if (item) {
    item.quantity += 1;
    item.save();
  } else {
    await cartModel.create({
      createdBy: userId,
      productId,
      size,
      quantity,
    });
  }
  res.status(StatusCodes.CREATED).json({ msg: "Product added" });
};

const updateCart = async (req, res) => {
  const {
    user: { userId },
    body: { itemId, size, quantity },
  } = req;
  const updatedCart = await cartModel.findOneAndUpdate(
    { createdBy: userId, _id: itemId },
    { size, quantity },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedCart) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Cart item not found" });
  }

  res.status(StatusCodes.OK).json({ msg: "Cart updated" });
};

const getUserCart = async (req, res) => {
  const { userId } = req.user;
  const cartData = await cartModel.find({ createdBy: userId });
  res.status(StatusCodes.OK).json(cartData);
};
const removeFromCart = async (req, res) => {
  const { userId } = req.user;
  const { itemId } = req.params;
  const cartData = await cartModel.deleteOne({
    createdBy: userId,
    _id: itemId,
  });
  if (cartData.deletedCount === 0) {
    throw new BadRequestError("Error removing the item");
  }
  res.status(StatusCodes.OK).json({ msg: "Item removed successfully" });
};

export { addToCart, updateCart, getUserCart, removeFromCart };
