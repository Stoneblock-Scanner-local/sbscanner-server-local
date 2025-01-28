import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import { SignInValidator } from './dto/SignInDto';
import { SignUpValidator } from './dto/SignUpDto';
import { signUp, signIn, signOut } from '../../controllers/auth';
import { verifySession } from '../../middleware/auth/verifySession';
import { Role } from '@prisma/client';

const router = express.Router();

router.route('/sign-up').post(SignUpValidator, expressValidator, signUp);

router
  .route('/sign-in')
  .post(SignInValidator, expressValidator, signIn(Role.USER));

router.route('/sign-out').post(verifySession, signOut);

module.exports = router;
