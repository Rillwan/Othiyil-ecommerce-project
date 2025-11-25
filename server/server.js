import express from "express";
import colors from "colors";
import cors from "cors";
import bodyParser from "body-parser"
import morgan from "morgan";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import imageRoute from './routes/imageRoute.js';
import messageRoute from './routes/messageRoute.js';
import publicRoute from './routes/publicRoute.js';

const app = express();

// ==== mongodb connect =======
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configure env
dotenv.config();

// ======== Middle-ware ===========
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.disable("etag"); //  Disable ETag 

// Disable all caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
}); 

// ======= Routes =========
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/image", imageRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/public", publicRoute);

//route object
const router = express.Router();

// =========== routing
// app.use("/", router.get("/", (req, res) => {
//   res.send("hello world");
// }));

// console.log(__dirname);


// All other routes serve React's index.html
app.all("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
 
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on PORT: ${PORT} , ${process.env.DEV_MODE} mode `.bgCyan
      .white
  );
});
