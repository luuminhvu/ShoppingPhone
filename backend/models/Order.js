import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customerId: { type: String, required: true },
    paymentIntentId: { type: String },
    products: [
      {
        id: { type: String },
        name: { type: String },
        brand: { type: String },
        desc: { type: String },
        price: { type: String },
        image: { type: String },
        cartQuantity: { type: Number },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
