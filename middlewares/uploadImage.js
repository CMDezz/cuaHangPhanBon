const multer = require("multer");

// type = avatar | coach | trip
module.exports.uploadImage = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${type}s`)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
87
  const upload = multer({ storage: storage });

  return upload.any(type);
}

