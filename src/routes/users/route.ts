import express from '../../../server';
import { PaginationQueryValidator } from '../../common/validation/query/PaginationQueryDto';
import {
  deleteUser,
  getAll,
  getByIdentifier,
  getMe,
  updateProfile,
  updateUser,
  verifyEmail,
} from '../../controllers/users';
import { expressValidator } from '../../middleware/express/expressValidator';
import { TokenParamValidator } from '../../common/validation/params/TokenParamValidatorDto';
import { verifySession } from '../../middleware/auth/verifySession';
import { verifyRoles } from '../../middleware/auth/verifyRoles';
import { Role } from '@prisma/client';
import { UpdateProfileValidator } from './dto/UpdateUserDto';
import { IdParamValidator } from '../../common/validation/params';

const router = express.Router();

router
  .route('/')
  .get(verifySession, PaginationQueryValidator, expressValidator, getAll);

router.route('/me').get(verifySession, getMe);

router.route('/:identifier').get(getByIdentifier);

router
  .route('/update-profile')
  .patch(
    verifySession,
    UpdateProfileValidator,
    expressValidator,
    updateProfile,
  );

router
  .route('/:id')
  .put(
    verifySession,
    IdParamValidator,
    UpdateProfileValidator,
    verifyRoles(Role.ADMIN),
    expressValidator,
    updateUser,
  );

router
  .route('/:id')
  .delete(
    verifySession,
    IdParamValidator,
    verifyRoles(Role.ADMIN),
    expressValidator,
    deleteUser,
  );

router
  .route('/verify-email/:token')
  .put(TokenParamValidator, expressValidator, verifyEmail);

module.exports = router;
