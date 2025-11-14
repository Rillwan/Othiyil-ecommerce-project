import express from "express";
import {
        ActiveCategoryController,
        AdminCategoryController,
        CategoryDetailsController,
        CategoryProductsSearchController,
        CreateCategoryController, 
        CreateSubCategoryController, 
        DeleteCategoryController,
        DeleteSubCategoryController,
        GetCategoriesByNameController,
        getCategoryController, 
        GetSubCategoryNameController, 
        UpdateCategoryController, 
        UpdateCategoryImageController,
        UploadVideoBySubCategoryController
} from "../controller/categoryController.js";
import { requireAdminLogin } from "../middleware/adminAuth.js";
import { FileErrorHandler } from "../middleware/fileMiddleware.js";
import { Upload, UploadVideo } from "../config/storage.js";

const router = express.Router();

// ------------------------------- CATEGORY ROUTES -------------------------------
// ------------------------------------------------------------------------------
// ------------------------------ PROTECTED ------------------------------
// ADMIN - CREATE CATEGORY
router.post("/create", requireAdminLogin, Upload.single("image"), FileErrorHandler, CreateCategoryController);

// ADMIN - CREATE SUB- CATEGORY
router.post("/create-subcategory/:cid", requireAdminLogin, Upload.single("image"), FileErrorHandler, CreateSubCategoryController);

// ADMIN - GET CATEGORY 
router.get("/admin/categories", AdminCategoryController);

// ADMIN - DELETE CATEGORY
router.delete("/delete/:id", requireAdminLogin, DeleteCategoryController);

// ADMIN - DELETE SUB-CATEGORY
router.delete("/delete/sub-category/:id", requireAdminLogin, DeleteSubCategoryController);

// ADMIN - UPDATE CATEGORY
router.put("/update/:id", requireAdminLogin, Upload.single("image"), FileErrorHandler, UpdateCategoryController);

// ADMIN - ACTIVE UPDATE CATEGORY
router.put("/active/:id", requireAdminLogin, Upload.none(), ActiveCategoryController);

// ADMIN - CREATE CATEGORY
router.put("/admin/subcategory/upload-video/:id", requireAdminLogin, UploadVideo.single("video"), FileErrorHandler, UploadVideoBySubCategoryController);

// ADMIN - GET SUB-CATEGORY NAME
router.get("/admin/subcategory/name/:id", requireAdminLogin, GetSubCategoryNameController);

// ---------------------------- USER CATEGORY ROUTES ----------------------------
// GET CATEGORIES
router.get("/", getCategoryController);

// GET CATEGORY BY ID

export default router;
