import multer from "multer";

const storage = multer.memoryStorage();
const uploads = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

export default uploads;
