import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// image Storage config
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      crypto.randomBytes(6).toString("hex") +
      path.extname(file.originalname); // keep original extension
    cb(null, uniqueName);
  },
});

// video Storage config
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      crypto.randomBytes(6).toString("hex") +
      path.extname(file.originalname); // keep original extension
    cb(null, uniqueName);
  },
});

// image file filter
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

// video file filter
// File filter — only accept video files
const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|mkv|wmv/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

export const Upload = multer({
  storage: imgStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 10 MB
  fileFilter: imageFilter,
});

// Max file size = 100MB (100 * 1024 * 1024 bytes)
export const UploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

// DELETE UPLOADED FILE ERROR HANDLER
// Set Images Folder Path
const ImageDirectory = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploadDirectoryPath = path.join(__dirname, "../uploads/images"); // Directory where files are uploaded to server
  return uploadDirectoryPath;
};
export const FindImageUploadDirectory = (filename) => {
  const filePath = path.join(ImageDirectory(), filename);
  return filePath;
};
