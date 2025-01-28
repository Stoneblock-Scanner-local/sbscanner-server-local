import { Response, NextFunction } from 'express';
import {
  generatePasswordHash,
  validatePasswordHash,
} from '../../common/utils/helpers';
import userService from '../users';
import { SignInDto } from '../../routes/auth/dto/SignInDto';
import { SignUpDto } from '../../routes/auth/dto/SignUpDto';
import emailService from '../../services/email';
import { createCustomError } from '../../errors/custom-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import UserDto from '../../routes/users/dto/UserDto';
import { Role } from '@prisma/client';

const signUp = async (
  signUpBody: SignUpDto,
  res: Response,
  next: NextFunction,
) => {
  const {
    email,
    username,
    password,
    repeatPassword,
    acceptedTermsAndConditions,
  } = signUpBody;

  if (password !== repeatPassword) {
    return next(createCustomError('Passwords do not match', 400));
  }

  if (!acceptedTermsAndConditions) {
    return next(
      createCustomError('You must accept the terms and conditions', 400),
    );
  }

  const hashedPassword = await generatePasswordHash(password);

  try {
    const createdUser = await userService.createUser({
      email: email,
      password: hashedPassword,
      acceptedTermsAndConditions: acceptedTermsAndConditions,
      displayName: username,
    });

    await emailService.sendUserVerificationEmail(createdUser);

    return res.status(201).json(new UserDto(createdUser));
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        const target = e.meta?.target as string[];
        if (target[0] === 'email') {
          return next(createCustomError('Email already exists', 409));
        }
        if (target[0] === 'displayName') {
          return next(createCustomError('Username already exists', 409));
        }
      }
    }
    next(e);
  }
};

const signIn = async (signInBody: SignInDto, allowedRole: Role) => {
  const user = await userService.getByIdentifier(signInBody.email);

  if (
    !user ||
    !(await validatePasswordHash(signInBody.password, user.password)) ||
    allowedRole !== user.role
  )
    return null;

  return new UserDto(user);
};

export default { signUp, signIn };
