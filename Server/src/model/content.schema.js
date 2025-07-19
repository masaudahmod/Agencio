import mongoose, { model, Schema } from "mongoose";

const contentSchema = Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    postMaterial: { type: String },
    posterMaterial: { type: String },
    vision: { type: String },
    tags: { type: [String] },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
    comments: {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
      date: Date,
    },
  },
  { timestamps: true }
);

// index for fast filtering
contentSchema.index({ business: 1, date: 1 });

export const Content =
  mongoose.models.Content || model("Content", contentSchema);
