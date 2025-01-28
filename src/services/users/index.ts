import { Role, User } from '@prisma/client';
import prisma from '../../common/config/prisma';

const createUser = async (user: Partial<User>) => {
  return await prisma.user.create({
    data: {
      email: user.email!,
      displayName: user.displayName!,
      password: user.password!,
      acceptedTermsAndConditions: user.acceptedTermsAndConditions,
    },
  });
};

const getByIdentifier = async (identifier: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          id: { equals: identifier, mode: 'insensitive' },
        },
        {
          email: { equals: identifier, mode: 'insensitive' },
        },
        {
          displayName: { equals: identifier, mode: 'insensitive' },
        },
      ],
    },
    include: {
      SavedNominations: true,
      NominationVotes: true,
      NominationRatings: true,
    },
  });
};

const getAll = async (skip: number, take: number) => {
  return await prisma.user.findMany({
    take,
    skip,
    where: {
      role: Role.USER,
    },
  });
};

const updateUser = async (id: string, user: Partial<User>) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
};

const verifyEmail = async (verificationToken: string) => {
  return await prisma.user.update({
    data: {
      isEmailVerified: true,
    },
    where: {
      verificationToken,
    },
  });
};

export default {
  createUser,
  getByIdentifier,
  getAll,
  updateUser,
  deleteUser,
  verifyEmail,
};
