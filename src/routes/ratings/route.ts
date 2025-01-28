import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import { verifySession } from '../../middleware/auth/verifySession';
import { NominationIdParamValidator } from '../nominations/dto/params/NominationIdParamValidatorDto';
import { createRating, getAvarageRating } from '../../controllers/ratings';
import { RatingValidator } from './dto/RatingDto';

const router = express.Router();

router
  .route('/nomination/:nominationId')
  .post(
    verifySession,
    NominationIdParamValidator,
    RatingValidator,
    expressValidator,
    createRating,
  );

router
  .route('/nomination/:nominationId')
  .get(NominationIdParamValidator, expressValidator, getAvarageRating);

module.exports = router;
