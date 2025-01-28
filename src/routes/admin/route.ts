import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import { SignInValidator } from '../auth/dto/SignInDto';
import { signIn, signOut } from '../../controllers/auth';
import { verifySession } from '../../middleware/auth/verifySession';
import { verifyRoles } from '../../middleware/auth/verifyRoles';
import { Role } from '@prisma/client';

const adminRoute = express.Router();

adminRoute
  .route('/auth/sign-in')
  .post(SignInValidator, expressValidator, signIn(Role.ADMIN));

adminRoute
  .route('/auth/sign-out')
  .post(verifySession, verifyRoles(Role.ADMIN), signOut);

module.exports = adminRoute;
