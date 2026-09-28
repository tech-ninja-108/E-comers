import mongoose from "mongoose";
import config from "./config.js";

const Dbconnection = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Db connected");
  } catch (error) {
    console.log("Db connection failled",error);
  }
};

export default Dbconnection