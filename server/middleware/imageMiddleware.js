import Joi from "joi";
import mongoose from "mongoose";

// ✅ Custom Joi validation for ObjectId
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

// IMAGE REQUEST VALIDATION
export const ImageRequestValidation = async (req, res, next) => {
  const schema = Joi.object({
    px: Joi.number().integer().min(10).max(9999).required(),
    id: Joi.string().custom(objectIdValidator, "ObjectId validation").max(50).required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Invalid Image Request",
      validation: error.details[0].message,
    });
  }
};
