import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import {
  toggleNominationVote,
  getNominationVoteCount,
  getNominationBulkCount,
} from '../../controllers/votes';
import { verifySession } from '../../middleware/auth/verifySession';
import { NominationIdParamValidator } from '../nominations/dto/params/NominationIdParamValidatorDto';
import { NominationVoteValidator } from './dto/NominationVoteDto';
import { IdsQueryValidator } from '../../common/validation/query/IdsQueryValidator';

const router = express.Router();

router
  .route('/nomination/:nominationId')
  .post(
    verifySession,
    NominationIdParamValidator,
    NominationVoteValidator,
    expressValidator,
    toggleNominationVote,
  );

router
  .route('/nomination/count/:nominationId')
  .get(NominationIdParamValidator, expressValidator, getNominationVoteCount);

router
  .route('/nomination/bulk-count')
  .get(IdsQueryValidator, expressValidator, getNominationBulkCount);

module.exports = router;
