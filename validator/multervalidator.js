// const multer = require("multer");
// const uploads =require('../utilities/multer');
// const upload = multer({
//     uploads.storage,
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png/; // Only allow image formats
//         const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimeType = fileTypes.test(file.mimetype);

//         if (extName && mimeType) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images are allowed (jpeg, jpg, png)'));
//         }
//     },
// });

// module.exports =upload;
