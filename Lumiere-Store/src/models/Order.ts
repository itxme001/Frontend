import mongoose from "mongoose";
import { Schema, model, models, type InferSchemaType } from "mongoose";

const OrderItemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, default: "" },
    color: { type: String },
    size: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    date: { type: String, default: () => new Date().toISOString() },
    status: { type: String, enum: ["paid", "pending", "demo"], default: "pending" },
    items: { type: [OrderItemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    email: { type: String },
    customerName: { type: String },
    stripeSessionId: { type: String },
  },
  { timestamps: false, strict: true }
);

export type OrderDoc = InferSchemaType<typeof OrderSchema>;

export const Order =
  (models.Order as mongoose.Model<OrderDoc>) || model<OrderDoc>("Order", OrderSchema);
