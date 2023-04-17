import path from "path";
import express from "express";
import multer from "multer";

const app = express();
const dir = path.join(__dirname, "uploads");
app.use(express.static(dir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();
    const filename = `${fieldname}-${date}-${originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

export default upload;
