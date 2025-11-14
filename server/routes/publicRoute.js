import express from "express";
import {
  GetPublicCategoryByProductsController,
  GetPublicCategoryController,
  GetPublicHomeDataController,
  PublicMessageSubmitController,
} from "../controller/publicController.js";
import { ContactValidation } from "../middleware/adminAuth.js";
import { Upload } from "../config/storage.js";

const router = express.Router();

// ------------------------------- PUBLIC ROUTES -------------------------------
// GET HOME
router.get("/home", GetPublicHomeDataController);

// GET CATEGORY
router.get("/categories", GetPublicCategoryController);

// GET CATEGORY BY PRODUCTS
router.get("/category/:name", GetPublicCategoryByProductsController);

// SUBMIT FORM
router.post("/submit-contact", ContactValidation, Upload.none(), PublicMessageSubmitController
);

export default router;
