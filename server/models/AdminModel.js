import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
