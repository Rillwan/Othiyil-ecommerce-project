import dotenv from "dotenv";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import AdminModel from "../models/AdminModel.js";
import JWT from "jsonwebtoken";
// import {
//   GenerateOTPwithResendEmail,
//   VerifyOTP,
// } from "../helpers/otpHelpers.js";

dotenv.config();
// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- ADMIN AUTHENTICATION ----------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// ADMIN - REGISTER
export const AdminRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL) {
      // Required Values
      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Email is Required",
        });
      } else if (!password) {
        return res.status(400).send({
          success: false,
          message: "Password is Required",
        });
      } else if (!name) {
        return res.status(400).send({
          success: false,
          message: "Name is Required",
        });
      }
      // Existing Admin
      const admin = await AdminModel.findOne({ email });
      if (admin) {
        return res.status(400).send({
          success: false,
          message: "Admin Already Exist",
        });
      }
      // Create Admin & Save
      const newAdmin = new AdminModel({
        name,
        email,
        password: await hashPassword(password),
      });
      await newAdmin.save();
      return res.status(200).send({
        success: true,
        message: "Admin Created Successfully",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid Request!.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// ADMIN - LOGIN
export const AdminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Required Values
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    } else if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }
    // Check Admin Existing
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Admin Not Found!",
      });
    } else {
      // Check Password
      const isValidPassword = await comparePassword(password, admin?.password);
      if (!isValidPassword) {
        return res.status(400).send({
          success: false,
          message: "Invalid Password,Try Again.!",
        });
      } else {
        // Generate Token
        const token = await JWT.sign(
          { id: admin._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
            // expiresIn: "7d",
          }
        );
        // Save Token
        await AdminModel.findByIdAndUpdate(admin._id, { token });
        return res.status(200).send({
          success: true,
          message: "Admin Login Successfully",
          token,
          admin: {
            _id: admin?._id,
            name: admin?.name,
            email: admin?.email,
            role: admin?.role,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// ADMIN - SEND OTP
export const AdminSendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === process.env.ADMIN_EMAIL) {
      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Email is required",
        });
      }
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        return res.status(400).send({
          success: false,
          message: "Admin Not Found! Register Now.",
        });
      } else {
        // await GenerateOTPwithResendEmail({ email: email });
        return res.status(200).send({
          success: true,
          message: "OTP Sent Successfully",
        });
      }
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// ADMIN - FORGOT PASSWORD (UPDATE) - VERIFY OTP
export const AdminForgotPasswordVerifyOtpController = async (req, res) => {
  try {
    const { email, newPassword, OTP } = req.body;
    if (email === process.env.ADMIN_EMAIL) {
      if (!newPassword) {
        return res.status(400).send({
          success: false,
          message: "Please Enter New Password",
        });
      } else if (!email) {
        return res.status(400).send({
          success: false,
          message: "Please Enter Email",
        });
      } else if (!OTP) {
        return res.status(400).send({
          success: false,
          message: "Please Enter OTP",
        });
      }
      // Admin Existing
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        return res.status(400).send({
          success: false,
          message: "Admin Not Found",
        });
      } else {
        // OTP Verify
        const verify = await VerifyOTP({ email: email, otp: OTP });
        if (verify) {
          // Update Password
          const updatePassword = await AdminModel.updateOne(
            { email },
            {
              $set: {
                password: await hashPassword(newPassword),
              },
            }
          );
          if (updatePassword) {
            return res.status(200).send({
              success: true,
              message: "Password Updated Successfully",
            });
          } else {
            return res.status(400).send({
              success: false,
              message: "Failed to Update Password",
            });
          }
        } else {
          return res.status(400).send({
            success: false,
            message: "Invalid OTP",
          });
        }
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "You are not an admin",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// TOKEN VERIFY
export const AdminTokenVerifyController = async (req, res) => {
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
          return res.status(200).send({
            success: true,
            message: "Token Verified Successfully",
            token,
            admin: {
              _id: admin._id,
              name: admin.name,
              email: admin.email,
              role: admin.role,
            },
          });
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
      message: "Request Failed",
      authorization: false,
    });
  }
};

// --------------------------------------------------------------------------------------------------------------

// UPDATE ADMIN ACCOUNT
export const UpdateAdminAccountController = async (req, res) => {
  try {
    const { id } = req.params;
    const { mobile, address, storeName } = req.body;
    console.log(JSON.parse(address));

    if (id) {
      const admin = await AdminModel.findByIdAndUpdate(id, {
        $set: {
          mobile: mobile,
          address: JSON.parse(address),
          storeName: storeName,
        },
      });
      if (!admin) {
        return res.status(404).send({
          success: false,
          message: "Admin Not Found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Admin Updated Successfully",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Admin Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
