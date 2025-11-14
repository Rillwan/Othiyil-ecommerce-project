import express from "express";
import {
  GetProductAttributesController,
  CreateProductController,
  DeleteProductController,
  DeleteProductSelectedImageController,
  GetProductsController,
  UpdateProductController,
  GetProductListController,
  GetProductByIdController,
  AdminProductByIdController,
} from "../controller/productController.js";
import { requireAdminLogin } from "../middleware/adminAuth.js";
import { FileErrorHandler } from "../middleware/fileMiddleware.js";
import { Upload } from "../config/storage.js";

const router = express.Router();

// ------------------------------- PRODUCT ROUTES -------------------------------
// ------------------------------------------------------------------------------
// ------------------------------ PROTECTED ------------------------------
// ADMIN - CREATE PRODUCT
router.post("/admin/create-product", requireAdminLogin, Upload.array("images"), FileErrorHandler, CreateProductController);

// ADMIN - GET PRODUCT ATTRIBUTES
router.get("/admin/get-product-attributes", requireAdminLogin, GetProductAttributesController);

// ADMIN - GET PRODUCT LIST
router.get("/admin/list", requireAdminLogin, GetProductListController);

// ADMIN - UPDATE PRODUCT
router.put("/admin/update-product/:pid", requireAdminLogin, Upload.array("images"), FileErrorHandler, UpdateProductController);

// ADMIN - DELETE PRODUCT SELECTED IMAGE
router.put("/admin/delete-product-image/:id", requireAdminLogin, Upload.none(), DeleteProductSelectedImageController);

// ADMIN - DELETE PRODUCT
router.delete("/admin/delete/:id", requireAdminLogin, DeleteProductController);

// ADMIN - GET PRODUCT BY ID
router.get("/admin/:pid", requireAdminLogin, AdminProductByIdController);

// -------------------------------------------------------------------------------------
// ----------------------------------- PUBLIC ----------------------------------- 
// GET PRODUCTS
router.get("/", GetProductsController);

// GET PRODUCT ATTRIBUTE (BRANDS & CATEGORIES)
router.get("/product-attributes", GetProductAttributesController);

// SEARCH PRODUCTS
// router.get("/search", SearchProductsController);

// GET PRODUCT BY ID
router.get("/:pid", GetProductByIdController);

export default router;
