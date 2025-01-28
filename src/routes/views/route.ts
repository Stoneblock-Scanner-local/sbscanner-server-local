import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import { NominationIdParamValidator } from '../nominations/dto/params/NominationIdParamValidatorDto';
import {
  setViewForNomination,
  getNominationView,
  getNominationViewBulk,
} from '../../controllers/views';
import { attachIpAddress } from '../../middleware/ipAddress/addIpAddress';
import { IdsQueryValidator } from '../../common/validation/query/IdsQueryValidator';

const router = express.Router();

router
  .route('/:nominationId')
  .get(NominationIdParamValidator, expressValidator, getNominationView);

router
  .route('/:nominationId')
  .post(
    NominationIdParamValidator,
    expressValidator,
    attachIpAddress,
    setViewForNomination,
  );

router
  .route('/nomination/bulk-count')
  .get(IdsQueryValidator, expressValidator, getNominationViewBulk);

module.exports = router;
