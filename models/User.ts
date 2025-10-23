import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fid: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    earned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", UserSchema);
