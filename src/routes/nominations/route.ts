import express from '../../../server';
import { NominationValidator } from './dto/NominationDto';
import { expressValidator } from '../../middleware/express/expressValidator';
import {
  createNomination,
  deleteNomination,
  getNominations,
  getNomination,
  updateNomination,
} from '../../controllers/nominations';
import { verifySession } from '../../middleware/auth/verifySession';
import { verifyRoles } from '../../middleware/auth/verifyRoles';
import { GetNominationsQueryValidator } from './dto/query/GetNominationsQueryDto';
import { IdParamValidator } from '../../common/validation/params';
import { Role } from '@prisma/client';

const router = express.Router();

router
  .route('/')
  .get(GetNominationsQueryValidator, expressValidator, getNominations);

router
  .route('/')
  .post(verifySession, NominationValidator, expressValidator, createNomination);

router.route('/:id').get(IdParamValidator, expressValidator, getNomination);

router
  .route('/:id')
  .put(
    verifySession,
    verifyRoles(Role.ADMIN),
    IdParamValidator,
    NominationValidator,
    expressValidator,
    updateNomination,
  );

router
  .route('/:id')
  .delete(
    verifySession,
    verifyRoles(Role.ADMIN),
    IdParamValidator,
    expressValidator,
    deleteNomination,
  );

module.exports = router;
