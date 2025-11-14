import express from "express";
import {
  AdminForgotPasswordVerifyOtpController,
  AdminLoginController,
  AdminRegisterController,
  AdminSendOtpController,
  AdminTokenVerifyController,
  // DeleteCartItemController,
  // GetAdminAccountController,
  // UpdateAdminAccountController,
  // UpdateCartController,
  // UserLoginController,
  // UserRegisterController,
} from "../controller/authController.js";
import { ApiLimiter, LoginValidation, RegisterValidation, requireAdminLogin, requireUserLogin } from "../middleware/adminAuth.js";
import { Upload } from "../config/storage.js";

const router = express.Router();
// -----------------------------------------------------------------------------------------------------------------
// --------------------------------------------- ADMIN AUTHENTICATION ----------------------------------------------
// REGISTER ADMIN
router.post("/admin/register", RegisterValidation, Upload.none(),  AdminRegisterController);

// LOGIN ADMIN
router.post("/admin/login", ApiLimiter, Upload.none(), LoginValidation, AdminLoginController);

// ADMIN - SEND OTP (OR RESEND)
router.post("/admin/send-otp", Upload.none(), AdminSendOtpController);

// ADMIN - FORGOT PASSWORD (UPDATE) - VERIFY OTP
router.put(
  "/admin/forgot-password",
  Upload.none(),
  AdminForgotPasswordVerifyOtpController,
);

// ADMIN - TOKEN VERIFY
router.get("/admin/token-verify", AdminTokenVerifyController);

export default router;
