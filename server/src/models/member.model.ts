import mongoose, { Document } from "mongoose";

export interface IMember extends Document {
  email: string;
  password: string;
  name: string;
  YOB: number;
  gender: boolean;
  isAdmin: boolean;
}

const memberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    YOB: {
      type: Number,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMember>("Member", memberSchema);
