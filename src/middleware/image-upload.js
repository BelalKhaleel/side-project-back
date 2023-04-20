import multer from "multer";

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
        );
    },
});

const upload = multer({
    storage: imageStorage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            callback(null, true);
        } else {
            console.log("only jpg & png file supported");
            callback(null, false);
        }
    },
}).single("image");

export default upload;
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     const { fieldname, originalname } = file;
//     const date = Date.now();
//     const filename = `${fieldname}-${date}-${originalname}`;
//     cb(null, filename);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5 MB
//   },
// });
// upload.single("image");
// export default upload;
