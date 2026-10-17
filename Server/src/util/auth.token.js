import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const CreateToken = (id, role) => {
  const ACCESS_TOKEN = jwt.sign({ id, role }, config.ACCESS_TOKEN, {
    expiresIn: "30m",
  });
  const REFRESH_TOKEN = jwt.sign({ id, role }, config.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return { ACCESS_TOKEN, REFRESH_TOKEN };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.ACCESS_TOKEN);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.REFRESH_TOKEN);
  } catch (error) {
    console.log("refreshToken");
  }
};
