import express from '../../../server';
import { EmailParamValidator } from './dto/params/EmailParamValidatorDto';
import { ResetPasswordValidator } from './dto/ResetPasswordDto';
import { TokenParamValidator } from '../../common/validation/params/TokenParamValidatorDto';
import { expressValidator } from '../../middleware/express/expressValidator';
import {
  requestPasswordReset,
  resetPassword,
} from '../../controllers/resetPassword';

const router = express.Router();

router
  .route('/requestPasswordReset/:email')
  .post(EmailParamValidator, expressValidator, requestPasswordReset);

router
  .route('/:token')
  .put(
    TokenParamValidator,
    ResetPasswordValidator,
    expressValidator,
    resetPassword,
  );

module.exports = router;
