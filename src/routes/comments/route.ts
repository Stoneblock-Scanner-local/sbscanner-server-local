import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import { verifySession } from '../../middleware/auth/verifySession';
import {
  createNominationComment,
  getAllNominationComments,
  deleteNominationComment,
  getNominationCommentsCount,
  getNominationBulkCount,
} from '../../controllers/comments';
import { NominationCommentValidator } from './dto/NominationCommentDto';
import { NominationIdParamValidator } from '../nominations/dto/params/NominationIdParamValidatorDto';
import { GetNominationCommentsQueryValidator } from './dto/query/GetNominationCommentsQueryDto';
import { IdParamValidator } from '../../common/validation/params';
import { IdsQueryValidator } from '../../common/validation/query/IdsQueryValidator';

const router = express.Router();

router
  .route('/nomination')
  .post(
    verifySession,
    NominationCommentValidator,
    expressValidator,
    createNominationComment,
  );

router
  .route('/nomination/count/:nominationId')
  .get(
    NominationIdParamValidator,
    expressValidator,
    getNominationCommentsCount,
  );

router
  .route('/nomination/bulk-count')
  .get(IdsQueryValidator, expressValidator, getNominationBulkCount);

router
  .route('/nomination/:nominationId')
  .get(
    NominationIdParamValidator,
    GetNominationCommentsQueryValidator,
    expressValidator,
    getAllNominationComments,
  );

router
  .route('/nomination/:id')
  .delete(
    verifySession,
    IdParamValidator,
    expressValidator,
    deleteNominationComment,
  );

module.exports = router;
