import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
  removeFromCart
} from "../controllers/cartController.js";
import userAuth from "../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.route("/get-cart").get(userAuth, getUserCart);
cartRouter.route("/update-cart").patch(userAuth, updateCart);
cartRouter.route("/add-to-cart").post(userAuth, addToCart);
cartRouter.route("/remove-from-cart/:itemId").delete(userAuth, removeFromCart);

export default cartRouter;
