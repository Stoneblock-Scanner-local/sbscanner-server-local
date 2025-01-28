import { NextFunction, Request, Response } from 'express';
import usersService from '../../services/users';
import { createCustomError } from '../../errors/custom-error';
import { PaginationQueryDto } from '../../common/validation/query/PaginationQueryDto';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '../../common/utils/constants';
import { User } from '@prisma/client';
import UserDto from '../../routes/users/dto/UserDto';
import { noRecordException } from '../../errors/no-record-exception';

const getAll = async (
  req: Request<{}, {}, {}, PaginationQueryDto>,
  res: Response,
) => {
  const { skip = DEFAULT_PAGINATION_SKIP, take = DEFAULT_PAGINATION_TAKE } =
    req.query;

  const users = await usersService.getAll(+skip, +take);

  const usersDto = users.map((user) => new UserDto(user));

  return res.status(200).json(usersDto);
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const user = await usersService.getByIdentifier(req.session?.user?.id);

  if (!user) {
    return next(
      createCustomError('There is no user that matches your identifier', 400),
    );
  }

  return res.status(200).json(new UserDto(user));
};

const getByIdentifier = async (
  req: Request<{ identifier: string }>,
  res: Response,
  next: NextFunction,
) => {
  const user = await usersService.getByIdentifier(req.params.identifier);

  if (!user) {
    return next(
      createCustomError('There is no user that matches your identifier', 400),
    );
  }

  return res.status(200).json(new UserDto(user));
};

const updateUser = async (
  req: Request<{ id: string }, {}, Partial<User>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);

    return res.status(200).json(new UserDto(user));
  } catch (error) {
    noRecordException(error, next);
  }
};

const updateProfile = async (
  req: Request<
    {},
    {},
    Pick<User, 'email' | 'displayName' | 'fullName' | 'imageSrc'>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.updateUser(req.session.user.id, req.body);

    return res.status(200).json(new UserDto(user));
  } catch (error) {
    noRecordException(error, next);
  }
};

const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.deleteUser(req.params.id);

    return res
      .status(200)
      .json({ message: `User with id: ${user?.id} deleted` });
  } catch (err: any) {
    noRecordException(err, next);
  }
};

const verifyEmail = async (
  req: Request<{ token: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const verifiedUser = await usersService.verifyEmail(req.params.token);

    return res.status(200).json(new UserDto(verifiedUser));
  } catch (err: any) {
    noRecordException(err, next);
  }
};

export {
  getByIdentifier,
  getAll,
  getMe,
  updateUser,
  updateProfile,
  deleteUser,
  verifyEmail,
};
