const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: (request, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
})

const upload = multer({ storage });

module.exports = upload;