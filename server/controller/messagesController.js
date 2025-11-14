import MessageModel from "../models/MessageModel.js";

// ADMIN GET MESSAGES CONTROLLER
export const GetMessagesController = async (req, res) => {
  try {
    var page = parseInt(req?.query?.page) || 1;
    var limit = parseInt(req?.query?.limit) || 10;
    var skip = (page - 1) * limit;
    // Get Message with pagination
    const Messages = await MessageModel.find({})
      .limit(limit) 
      .skip(skip)
      .sort({ createdAt: -1 })
      .select("-updatedAt -__v");
      
    // Total Message Count
    const total = await MessageModel.countDocuments();
    return res.status(200).send({
      success: true,
      message: "Messages Retrieved Successfully",
      result: Messages,
      total: total,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting Message",
      error: error.message,
    });
  }
};
