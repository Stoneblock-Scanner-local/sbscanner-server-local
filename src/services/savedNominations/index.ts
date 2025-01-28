import { ToggleSavedNominationState } from './types';
import prisma from '../../common/config/prisma';

const toggleNomination = async (
  userId: string,
  nominationId: string,
  toggleState: ToggleSavedNominationState,
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      SavedNominations: {
        [toggleState]: { id: nominationId },
      },
    },
    include: {
      SavedNominations: true,
    },
  });
};

const getUserSavedNomination = async (id: string, nominationId: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      SavedNominations: {
        where: {
          id: nominationId,
        },
      },
    },
  });
};

const getAllSavedNominationsByUser = async (
  id: string,
  skip: number,
  take: number,
  searchTerm?: string,
) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      SavedNominations: {
        where: {
          ...(searchTerm
            ? {
                OR: [
                  {
                    title: {
                      contains: searchTerm,
                      mode: 'insensitive',
                    },
                  },
                  {
                    name: {
                      contains: searchTerm,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {}),
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
        skip,
      },
    },
  });
};

const toggleSaveNomination = async (userId: string, nominationId: string) => {
  const user = await getUserSavedNomination(userId, nominationId);

  if (user?.SavedNominations.length) {
    return await toggleNomination(
      userId,
      nominationId,
      ToggleSavedNominationState.DISCONNECT,
    );
  }

  return await toggleNomination(
    userId,
    nominationId,
    ToggleSavedNominationState.CONNECT,
  );
};

export default { toggleSaveNomination, getAllSavedNominationsByUser };
