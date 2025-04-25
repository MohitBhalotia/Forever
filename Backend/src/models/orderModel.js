import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'CARD', 'PAYPAL'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  }
}, { timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
