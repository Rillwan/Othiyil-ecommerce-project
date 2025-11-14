import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("category", categorySchema);
