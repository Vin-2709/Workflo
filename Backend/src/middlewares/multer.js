// import multer from "multer";

//  const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// export const Uploadmulter = multer({ storage, })

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp"); //  This is the only writeable folder on Render
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Avoid name collisions
  }
});

export const Uploadmulter = multer({ storage });