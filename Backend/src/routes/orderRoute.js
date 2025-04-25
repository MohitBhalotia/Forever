import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} from "../controllers/orderController.js";
import userAuth from "../middleware/userAuth.js";

const orderRouter = express.Router();

orderRouter.route("/create").post(userAuth, createOrder);
orderRouter.route("/user-orders").get(userAuth, getUserOrders);
orderRouter.route("/:orderId").get(userAuth, getOrderById);
orderRouter.route("/cancel/:orderId").patch(userAuth, cancelOrder);

export default orderRouter;
