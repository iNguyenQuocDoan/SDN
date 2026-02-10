import mongoose, { Document, Types } from "mongoose";

export interface IComment {
  rating: number;
  content: string;
  author: Types.ObjectId;
}

export interface IPerfume extends Document {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  brand: Types.ObjectId;
  comments: IComment[];
}

const commentSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true }
);

const perfumeSchema = new mongoose.Schema(
  {
    perfumeName: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    concentration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    targetAudience: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IPerfume>("Perfume", perfumeSchema);
