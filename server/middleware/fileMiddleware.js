import multer from "multer";

// FILE ERROR HANDLING MIDDLEWARE
export const FileErrorHandler = (err, req, res, next) => {
  try {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({
        success: false,
        message: err?.message || "Error uploading file",
      });
    } else if (err) {
      return res.status(500).send({
        success: false,
        message: err?.message || "Error uploading file",
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
