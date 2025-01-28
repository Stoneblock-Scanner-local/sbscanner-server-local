import { NextFunction, Response } from 'express';
import userService from '../users/index';
import { createCustomError } from '../../errors/custom-error';
import { generateHash, generatePasswordHash } from '../../common/utils/helpers';
import prisma from '../../common/config/prisma';
import { ResetPasswordDto } from '../../routes/resetPassword/dto/ResetPasswordDto';

const PASSWORD_REQUEST_LIFESPAN = 1;

const requestPasswordReset = async (email: string, next: NextFunction) => {
  const currentTime = new Date();

  const userForRequestPassword = await userService.getByIdentifier(email);

  if (!userForRequestPassword) {
    return next(createCustomError("User doesn't exists", 400));
  }

  const resetToken = generateHash(
    JSON.stringify({
      email: email,
      createdOn: currentTime,
      lifespanDays: PASSWORD_REQUEST_LIFESPAN,
    }),
  );

  return await prisma.resetPasswordRequest.create({
    data: {
      createdAt: currentTime,
      token: resetToken,
      hasBeenUsed: false,
      userId: userForRequestPassword?.id,
    },
  });
};

const passwordReset = async (
  token: string,
  password: ResetPasswordDto,
  res: Response,
  next: NextFunction,
) => {
  const today = new Date();

  const { newPassword, confirmedPassword } = password;

  if (newPassword !== confirmedPassword) {
    return next(createCustomError("Passwords don't match", 400));
  }

  const resetPasswordRequest = await prisma.resetPasswordRequest.findFirst({
    where: {
      token: token,
    },
  });

  if (!resetPasswordRequest) {
    return next(createCustomError('Invalid token', 401));
  }

  const tokenExpDate = new Date();
  tokenExpDate.setDate(
    resetPasswordRequest?.createdAt.getDate() + PASSWORD_REQUEST_LIFESPAN,
  );

  if (resetPasswordRequest.hasBeenUsed || tokenExpDate < today) {
    return next(createCustomError('Token expired', 401));
  }

  const userPasswordUpdatePromise = prisma.user.update({
    where: {
      id: resetPasswordRequest.userId,
    },
    data: {
      password: await generatePasswordHash(newPassword),
    },
  });

  const passwordRequestUpdatePromise = prisma.resetPasswordRequest.update({
    where: {
      id: resetPasswordRequest.id,
    },
    data: {
      hasBeenUsed: true,
    },
  });

  await prisma.$transaction([
    userPasswordUpdatePromise,
    passwordRequestUpdatePromise,
  ]);

  return res.status(200).json({ msg: 'User password updated' });
};

export default { requestPasswordReset, passwordReset };
