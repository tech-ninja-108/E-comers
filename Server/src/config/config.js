import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  END_POINT: process.env.END_POINT,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
};

export default config;
