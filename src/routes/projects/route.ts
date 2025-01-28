import express from '../../../server';
import { expressValidator } from '../../middleware/express/expressValidator';
import {
  getFeaturedProject,
  getProjectBySlug,
  getProjects,
} from '../../controllers/projects';
import { GetProjectsQueryValidator } from './dto/query/GetProjectsQueryDto';

const router = express.Router();

router.route('/').get(GetProjectsQueryValidator, expressValidator, getProjects);

router.route('/featured').get(getFeaturedProject);

router.route('/:slug').get(getProjectBySlug);

module.exports = router;
