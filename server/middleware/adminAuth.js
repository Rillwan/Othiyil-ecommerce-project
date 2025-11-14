import JWT from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";
import Joi from "joi";
import { rateLimit } from "express-rate-limit";
import UserModel from "../models/UserModel.js";

// ADMIN - PROTECTED ROUTES TOKEN BASE
export const requireAdminLogin = async (req, res, next) => {
  try {
    const token =
      req?.headers["authorization"].replace("Bearer ", "") ||
      req?.header("Authorization").replace("Bearer ", "");
    // const token = req.header("Authorization").replace("Bearer ", "");
    if (token) {
      const decoded = await JWT.verify(token, process.env.JWT_SECRET);
      if (decoded?.id) {
        const admin = await AdminModel.findById({
          _id: decoded.id,
        });
        if (admin?.token === token) {
          next();
        } else {
          return res.status(401).send({
            success: false,
            message: "Invalid token",
            authorization: false,
          });
        }
      } else {
        return res.status(401).send({
          success: false,
          message: "Admin Not Found",
          authorization: false,
        });
      }
    } else {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
        authorization: false,
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Token Request Failed",
      authorization: false,
    });
  }
};

// USER - PROTECTED ROUTES TOKEN BASE
export const requireUserLogin = async (req, res, next) => {
  try {
    const token =
      req?.headers["authorization"].replace("Bearer ", "") ||
      req?.header("Authorization").replace("Bearer ", "");
    if (token) {
      const decoded = await JWT.verify(token, process.env.JWT_SECRET);
      if (decoded?.id) {
        const user = await UserModel.findById({
          _id: decoded.id,
        });
        if (user?.token === token) {
          next();
        } else {
          return res.status(401).send({
            success: false,
            message: "Invalid token",
            authorization: false,
          });
        }
      } else {
        return res.status(401).send({
          success: false,
          message: "Login Now!",
          authorization: false,
        });
      }
    } else {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
        authorization: false,
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Token Request Failed",
      authorization: false,
    });
  }
};

// REGISTER VALIDATION
export const RegisterValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    name: Joi.string().min(3).max(30).required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Invalid Request",
      validation: error.details[0].message,
    });
  }
};

// LOGIN VALIDATION
export const LoginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Invalid Request",
      validation: error.details[0].message,
    });
  }
};

// API RATE-LIMIT (5 times in 15minutes)
export const ApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return RateLimit headers
  legacyHeaders: false, // Disable legacy X-RateLimit headers
  message: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    return {
      message: `Too many login attempts. Please try again after ${retryAfter} seconds.`,
    };
  },
});


// CONTACT FORM VALIDATION
export const ContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().min(10).max(15).required(),
    message: Joi.string().min(10).max(300).required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Invalid Request",
      validation: error.details[0].message,
    });
  }
};