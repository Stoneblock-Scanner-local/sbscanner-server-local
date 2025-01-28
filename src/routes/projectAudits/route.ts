import express from '../../../server';
import { verifySession } from '../../middleware/auth/verifySession';
import { expressValidator } from '../../middleware/express/expressValidator';
import { ProjectAuditValidator } from './dto/ProjectAuditDto';
import {
  createProjectAudit,
  getProjectAudits,
  deleteProjectAudit,
  getProjectAudit,
} from '../../controllers/projectAudits';
import { verifyRoles } from '../../middleware/auth/verifyRoles';
import { Role } from '@prisma/client';
import { GetProjectAuditsQueryValidator } from './dto/query/GetProjectAuditsQueryDto';
import { IdParamValidator } from '../../common/validation/params';

const router = express.Router();

router
  .route('/')
  .get(
    verifySession,
    verifyRoles(Role.ADMIN),
    GetProjectAuditsQueryValidator,
    expressValidator,
    getProjectAudits,
  );

router
  .route('/')
  .post(
    verifySession,
    ProjectAuditValidator,
    expressValidator,
    createProjectAudit,
  );

router
  .route('/:id')
  .get(
    verifySession,
    verifyRoles(Role.ADMIN),
    IdParamValidator,
    expressValidator,
    getProjectAudit,
  );

router
  .route('/:id')
  .delete(
    verifySession,
    verifyRoles(Role.ADMIN),
    IdParamValidator,
    expressValidator,
    deleteProjectAudit,
  );

module.exports = router;
