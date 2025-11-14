import express from "express";
import { requireAdminLogin } from "../middleware/adminAuth.js";
import { GetMessagesController } from "../controller/messagesController.js";

const router = express.Router();

// ------------------------------- MESSAGES ROUTES -------------------------------
// ------------------------------------------------------------------------------
// ------------------------------ PROTECTED ------------------------------
// ADMIN - GET MESSAGE LIST
router.get("/admin/list", requireAdminLogin, GetMessagesController);

export default router;
