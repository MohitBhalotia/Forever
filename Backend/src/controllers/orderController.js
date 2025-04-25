import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import BadRequestError from "../errors/bad-request.js";

// Create a new order
const createOrder = async (req, res) => {
  const { userId } = req.user;
  const { shippingAddress, paymentMethod } = req.body;
  
  // Validate shipping address
  if (!shippingAddress || !shippingAddress.name || !shippingAddress.address || 
      !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode || 
      !shippingAddress.country || !shippingAddress.phone) {
    throw new BadRequestError("Please provide complete shipping address");
  }
  
  // Get user's cart items
  const cartItems = await cartModel.find({ createdBy: userId });
  
  if (cartItems.length === 0) {
    throw new BadRequestError("Your cart is empty");
  }
  
  // Calculate total and prepare order items
  let totalAmount = 0;
  const orderItems = [];
  
  for (const item of cartItems) {
    const product = await productModel.findById(item.productId);
    if (!product) {
      throw new BadRequestError(`Product not found for item ${item._id}`);
    }
    
    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      price: product.price
    });
    
    totalAmount += product.price * item.quantity;
  }
  
  // Create the order
  const order = await orderModel.create({
    userId,
    items: orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'COD',
    totalAmount
  });
  
  // Clear the user's cart after successful order creation
  await cartModel.deleteMany({ createdBy: userId });
  
  res.status(StatusCodes.CREATED).json({
    orderId: order._id,
    totalAmount,
    message: "Order placed successfully"
  });
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
  const { userId } = req.user;
  
  const orders = await orderModel.find({ userId })
    .sort({ createdAt: -1 }); // Newest first
  
  res.status(StatusCodes.OK).json(orders);
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { userId } = req.user;
  const { orderId } = req.params;
  
  const order = await orderModel.findOne({ _id: orderId, userId });
  
  if (!order) {
    throw new BadRequestError("Order not found");
  }
  
  res.status(StatusCodes.OK).json(order);
};

// Cancel an order
const cancelOrder = async (req, res) => {
  const { userId } = req.user;
  const { orderId } = req.params;
  
  const order = await orderModel.findOne({ _id: orderId, userId });
  
  if (!order) {
    throw new BadRequestError("Order not found");
  }
  
  if (order.status !== 'PENDING' && order.status !== 'PROCESSING') {
    throw new BadRequestError("Cannot cancel order at this stage");
  }
  
  order.status = 'CANCELLED';
  await order.save();
  
  res.status(StatusCodes.OK).json({ message: "Order cancelled successfully" });
};

export { createOrder, getUserOrders, getOrderById, cancelOrder };
