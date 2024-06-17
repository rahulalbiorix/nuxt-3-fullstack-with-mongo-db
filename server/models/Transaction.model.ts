import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
  {
    amount: Number,
    type: String,
    description: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", schema);
