import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

// configure env
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}${process.env.MONGO_STORAGE_NAME}`);
    console.log(
      `Connect To Mongodb Database ${conn.connection.host} localhost, storage-name: ${process.env.MONGO_STORAGE_NAME} `.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
