import express from '../../../server';
import { PaginationQueryValidator } from '../../common/validation/query/PaginationQueryDto';
import { getNews } from '../../controllers/news';
import { expressValidator } from '../../middleware/express/expressValidator';

const router = express.Router();

router.route('/').get(PaginationQueryValidator, expressValidator, getNews);

module.exports = router;
