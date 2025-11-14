import express from "express";
import {
  GetImgHighQualityController,
  GetImgPixelQualityController,
  GetVideoByQualityController,
} from "../controller/imageController.js";
import { ImageRequestValidation } from "../middleware/imageMiddleware.js";
const router = express.Router();

// --------------------------- IMAGE ROUTES ---------------------------
// GET IMAGE PIXEL
router.get("/:px/:id", ImageRequestValidation, GetImgPixelQualityController);

// GET IMAGE HIGH QUALITY
router.get("/high/:id", GetImgHighQualityController);

// GET VIDEO BY QUALITY
router.get("/video/:size/:filename", GetVideoByQualityController);

export default router;
