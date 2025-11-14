import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: {
        street: String,
        city: String,
        state: String,
        pincode: Number,
        full_address: String,
        nearBy: String,
      },
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        _id: false,
      },
    ],
    // Orders Array objectId only
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
    token: {
      type: String,
      default: "",
    },
    payments: [
      {
        payment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Payments",
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
