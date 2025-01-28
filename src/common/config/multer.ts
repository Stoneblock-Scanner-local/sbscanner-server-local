const multer = require("multer");

const multerStorage = multer.memoryStorage();
const multerUploads = multer({ storage: multerStorage });

export default multerUploads;
