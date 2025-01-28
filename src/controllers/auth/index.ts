import { NextFunction, Response, Request } from 'express';
import authService from '../../services/auth';
import { SignUpDto } from '../../routes/auth/dto/SignUpDto';
import { SignInDto } from '../../routes/auth/dto/SignInDto';
import { createCustomError } from '../../errors/custom-error';
import {
  limiterFastBruteByIP,
  limiterSlowBruteByIP,
} from '../../common/config/rateLimit';
import {
  MAX_LOGIN_FAILS_BY_IP_PER_DAY,
  MAX_LOGIN_FAILS_BY_IP_PER_MINUTE,
} from '../../common/utils/constants';
import { Role } from '@prisma/client';

const signUp = async (
  req: Request<{}, {}, SignUpDto>,
  res: Response,
  next: NextFunction,
) => {
  return await authService.signUp(req.body, res, next);
};

const signIn = (role: Role) => {
  return async (
    req: Request<{}, {}, SignInDto>,
    res: Response,
    next: NextFunction,
  ) => {
    const ipAddr = req.socket.remoteAddress || '';

    const [resFastByIP, resSlowByIP] = await Promise.all([
      limiterFastBruteByIP.get(ipAddr),
      limiterSlowBruteByIP.get(ipAddr),
    ]);

    let retrySecs = 0;
    // Check if IP is already blocked
    if (
      resSlowByIP !== null &&
      resSlowByIP.consumedPoints > MAX_LOGIN_FAILS_BY_IP_PER_DAY
    ) {
      retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
    } else if (
      resFastByIP !== null &&
      resFastByIP.consumedPoints > MAX_LOGIN_FAILS_BY_IP_PER_MINUTE
    ) {
      retrySecs = Math.round(resFastByIP.msBeforeNext / 1000) || 1;
    }

    if (retrySecs > 0) {
      res.set('Retry-After', String(retrySecs));
      return next(createCustomError('Too many requests', 429));
    } else {
      const user = await authService.signIn(req.body, role);
      if (!user) {
        try {
          await Promise.all([
            limiterFastBruteByIP.consume(ipAddr),
            limiterSlowBruteByIP.consume(ipAddr),
          ]);
          return next(createCustomError('Wrong email or password', 401));
        } catch (rlRejected: any) {
          if (rlRejected instanceof Error) {
            return next(createCustomError(rlRejected.message, 401));
          } else {
            res.set(
              'Retry-After',
              (Math.round(rlRejected.msBeforeNext / 1000) || 1).toString(),
            );
            return next(createCustomError('Too many requests', 429));
          }
        }
      }

      if (!user.isEmailVerified) {
        return next(createCustomError('You should verify your email', 401));
      }

      req.session.user = { id: user.id, email: user?.email, role: user.role };

      return res.status(200).json({ message: 'Login success' });
    }
  };
};

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      return next(createCustomError('Server error', 500));
    } else {
      res.clearCookie('sessionId');
      return res.status(201).json({ message: 'Logout success' });
    }
  });
};

export { signUp, signIn, signOut };
