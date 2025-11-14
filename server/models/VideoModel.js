import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  video: {
    type: String,
    require:true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
    required: true,
  },
});
export default mongoose.model("video", VideoSchema);
