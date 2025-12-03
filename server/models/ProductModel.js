import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subcategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        default: "",
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    measurement: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductSchema);
