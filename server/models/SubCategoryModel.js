import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
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
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  video: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
export default mongoose.model("subcategory", SubCategorySchema);
