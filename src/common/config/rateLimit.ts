import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient } from './redis';
import {
  MAX_LOGIN_FAILS_BY_IP_PER_DAY,
  MAX_LOGIN_FAILS_BY_IP_PER_MINUTE,
} from '../utils/constants';

const RateLimit = require('express-rate-limit');

/* MIDDLEWARE */

// Allow 300 requests per minute
export const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 300,
  keyGenerator(req: any) {
    return process.env.NODE_ENV === 'production'
      ? req.get('true-client-ip')
      : req.ip;
  },
});

/* LOGIN LIMITER */

// Block for 10 minutes, if 5 wrong attempts per 30 seconds
export const limiterFastBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_ip_per_minute',
  points: MAX_LOGIN_FAILS_BY_IP_PER_MINUTE,
  duration: 30,
  blockDuration: 60 * 10,
});

// Block for 1 day, if 50 wrong attempts per day
export const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_ip_per_day',
  points: MAX_LOGIN_FAILS_BY_IP_PER_DAY,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24,
});
