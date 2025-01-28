import express from '../../../server';
import {
  toggleNomination,
  getSavedNominations,
} from '../../controllers/savedNominations';
import { verifySession } from '../../middleware/auth/verifySession';
import { expressValidator } from '../../middleware/express/expressValidator';
import { GetSavedNominationsQueryValidator } from './dto/query/GetSavedNominationsQueryDto';
import { NominationIdParamValidator } from '../nominations/dto/params/NominationIdParamValidatorDto';

const router = express.Router();

router
  .route('/:nominationId')
  .post(
    verifySession,
    NominationIdParamValidator,
    expressValidator,
    toggleNomination,
  );

router
  .route('/')
  .get(
    verifySession,
    GetSavedNominationsQueryValidator,
    expressValidator,
    getSavedNominations,
  );

module.exports = router;
