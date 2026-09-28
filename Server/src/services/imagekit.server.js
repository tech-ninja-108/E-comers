import imagekit from "imagekit";
import config from "../config/config.js";
const imageKit = new imagekit({
  publicKey: config.PUBLIC_KEY,
  privateKey: config.PRIVATE_KEY,
  urlEndpoint: config.END_POINT,
});

export default imageKit