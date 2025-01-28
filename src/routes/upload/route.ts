import express from '../../../server';
import { uploadPresentation, uploadProfile } from '../../controllers/upload';
import multerUploads from '../../common/config/multer';
import { postFileValidator } from '../../middleware/file/postFileValidator';
import { verifySession } from '../../middleware/auth/verifySession';
import { fileSizeValidator } from '../../middleware/file/fileSizeValidator';
import { fileTypeValidator } from '../../middleware/file/fileTypeValidator';
import { MediaTypes } from '../../common/types/media';

const router = express.Router();

router
  .route('/presentation')
  .post(
    verifySession,
    multerUploads.single('file'),
    postFileValidator,
    fileTypeValidator(MediaTypes.PRESENTATION),
    fileSizeValidator(10),
    uploadPresentation,
  );

router
  .route('/profile')
  .post(
    verifySession,
    multerUploads.single('file'),
    postFileValidator,
    fileTypeValidator(MediaTypes.IMAGE),
    fileSizeValidator(10),
    uploadProfile,
  );

module.exports = router;
