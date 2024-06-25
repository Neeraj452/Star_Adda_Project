// const multer = require("multer");
// const path = require("path");

// // Configure storage for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Directory to save uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
//   },
// });

// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG and PNG are allowed!"), false);
//   }
// };

// // Initialize multer with storage and file filter
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
//   fileFilter: fileFilter,
// });

// module.exports = upload;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
