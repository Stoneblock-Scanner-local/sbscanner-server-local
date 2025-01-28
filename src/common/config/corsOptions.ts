import { allowedOrigins } from '../utils/constants';

const corsOptions = {
  origin: (origin: string, callback: Function) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
