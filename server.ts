import express, { Express, NextFunction, Request, Response } from 'express';
import errorHandlerMiddleware from './src/middleware/errors/errorHandler';
import errorNotFound from './src/middleware/errors/errorNotFound';
import { limiter } from './src/common/config/rateLimit';
import sessionConfig from './src/common/config/session';
import { publicConfig } from './src/common/config/constants';
const cors = require('cors');
const corsOptions = require('./src/common/config/corsOptions');
const credentials = require('./src/middleware/credentials');
const helmet = require('helmet');
require('dotenv').config();
export default express;

const app: Express = express();
const port = publicConfig.port;

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(sessionConfig);

app.get('/', (req: Request, res: Response) => {
  res.send(req.get('true-client-ip'));
});

app.use('/auth', require('./src/routes/auth/route'));
app.use('/nominations', require('./src/routes/nominations/route'));
app.use('/projects', require('./src/routes/projects/route'));
app.use('/project-audits', require('./src/routes/projectAudits/route'));
app.use('/upload', require('./src/routes/upload/route'));
app.use('/users', require('./src/routes/users/route'));
app.use('/news', require('./src/routes/news/route'));
app.use('/comments', require('./src/routes/comments/route'));
app.use('/votes', require('./src/routes/votes/route'));
app.use('/ratings', require('./src/routes/ratings/route'));
app.use('/reset-password', require('./src/routes/resetPassword/route'));
app.use('/saved-nominations', require('./src/routes/savedNominations/route'));
app.use('/views', require('./src/routes/views/route'));
app.use('/admin', require('./src/routes/admin/route'));

app.use(errorHandlerMiddleware);
app.use(errorNotFound);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
