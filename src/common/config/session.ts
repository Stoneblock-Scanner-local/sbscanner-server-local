import session from 'express-session';
import { redisStore } from './redis';
require('dotenv').config();
import { publicConfig } from './constants';

const sessionConfig = session({
  store: redisStore,
  secret: publicConfig.session_secret,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: publicConfig.cookie_domain,
    maxAge: 1000 * 60 * 30,
    ...(process.env.NODE_ENV === 'production'
      ? { sameSite: 'none', secure: true }
      : { secure: false }),
  },
});

export default sessionConfig;
