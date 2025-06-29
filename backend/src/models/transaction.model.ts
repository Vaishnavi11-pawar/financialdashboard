import mongoose, { Document, Schema, Model } from "mongoose";

// 1. Define the interface
export interface ITransaction extends Document {
  date: Date;
  amount: number;
  category: "Revenue" | "Expense";
  status: "Paid" | "Pending";
  user_id: string; // matching user_001, etc.
  user_profile?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the schema
const transactionSchema = new Schema<ITransaction>(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Revenue", "Expense"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending"],
      required: true,
    },
    user_id: { type: String, required: true }, // we’re keeping string since user_id is like "user_001"
    user_profile: { type: String },
  },
  { timestamps: true }
);

// 3. Create and export the model
const Transaction: Model<ITransaction> = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
