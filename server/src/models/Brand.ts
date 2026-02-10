import mongoose, { Document } from "mongoose";

export interface IBrand extends Document {
  brandName: string;
}

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBrand>("Brand", brandSchema);
