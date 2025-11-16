import fs from "fs";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ImgFilePath = path.join(__dirname, "../../../uploads/images/");
const VideoFilePath = path.join(__dirname, "../../../uploads/videos/");

// GET IMAGE HIGH QUALITY
export const GetImgHighQualityController = async (req, res) => {
  try {
    if (req.params.id) {
      // const imageFiles = fs.readdirSync("images/"); //read folder files
      const img = await fs.readFileSync(path.join(ImgFilePath, req.params.id)); // read file by image-id
      // console.log(imageFiles);
      res.set("Content-Type", "image/jpg"); //file type set
      res.status(200).send(img); //send image
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting image",
      error: error.message,
    });
  }
};

// GET IMAGE PIXEL
export const GetImgPixelQualityController = async (req, res) => {
  try {
    if (req?.params?.px && req?.params?.id) {
      // Resize the image
      const img = await fs.readFileSync(path.join(ImgFilePath, req.params.id)); // read file by image-id
      const resizedImageBuffer = await sharp(Buffer.from(img, "base64"))
        .resize(Number(req.params.px)) // Adjust dimensions as needed (pixel value)
        .toBuffer();
      res.set("Content-Type", "image/jpg"); //file type set
      return res.status(200).send(resizedImageBuffer); //send image
    } else {
      return res.status(400).send({
        success: false,
        message: "Image Not Found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Get Profile Resized image",
      error: error.message,
    });
  }
};

// GET FILE BY PIXEL
export const GetVideoByQualityController = async (req, res) => {
  try {
    const { size, filename } = req?.params;
    if (size && filename) {
      /// Construct absolute path to video
      const videoPath = path.join(
        VideoFilePath,
        filename
      );
      // Check if file exists
      if (!fs.existsSync(videoPath)) {
        return res.status(404).json({ message: "Video not found" });
      }

      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

      // Include file size in headers
      res.setHeader("X-Video-Size-MB", fileSizeMB);
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Accept-Ranges", "bytes");

      const range = req.headers.range;
      if (range) {
        // Parse range header: bytes=start-end
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
          "X-Video-Size-MB": fileSizeMB,
        };

        res.writeHead(206, head); // Partial content
        file.pipe(res);
      } else {
        // No range header, send entire file
        res.setHeader("Content-Length", fileSize);
        fs.createReadStream(videoPath).pipe(res);
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Video Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Invalid Request" });
  }
};
