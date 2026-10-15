import mongoose from "mongoose";
import { Schema, model, models, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { timestamps: false, strict: true }
);

// Keep createdAt as number (matches existing StoredUser interface)
UserSchema.set("toJSON", { virtuals: false });

export type UserDoc = InferSchemaType<typeof UserSchema>;

export const User =
  (models.User as mongoose.Model<UserDoc>) || model<UserDoc>("User", UserSchema);
