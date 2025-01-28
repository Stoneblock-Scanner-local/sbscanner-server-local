import { Request, Response, NextFunction } from 'express';
import resetPasswordService from '../../services/resetPassword/index';
import emailService from '../../services/email/index';
import { ResetPasswordRequest } from '@prisma/client';
import { ResetPasswordDto } from '../../routes/resetPassword/dto/ResetPasswordDto';

export const requestPasswordReset = async (
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction,
) => {
  const email = req.params.email;

  try {
    const resetPasswordRequest =
      (await resetPasswordService.requestPasswordReset(
        email,
        next,
      )) as ResetPasswordRequest;

    await emailService.sendForgotPasswordEmail(
      email,
      resetPasswordRequest.token,
    );

    return res.status(200).json({ msg: 'Reset password request successfull' });
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (
  req: Request<{ token: string }, {}, ResetPasswordDto>,
  res: Response,
  next: NextFunction,
) => {
  return await resetPasswordService.passwordReset(
    req.params.token,
    req.body,
    res,
    next,
  );
};
