import mongoose from "mongoose";
import { Schema, model, models, type InferSchemaType } from "mongoose";

/**
 * Product schema — strict: false allows per-category extra fields
 * (e.g. apparel has sizes[], fragrance has notes object).
 * Common fields are declared explicitly for indexing/querying.
 */
const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    images: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    stock: { type: Number, default: 0 },
    material: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { strict: false, timestamps: false }
);

export type ProductDoc = InferSchemaType<typeof ProductSchema> & Record<string, unknown>;

export const Product =
  (models.Product as mongoose.Model<ProductDoc>) || model<ProductDoc>("Product", ProductSchema);
