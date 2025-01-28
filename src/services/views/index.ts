import prisma from '../../common/config/prisma';
import { reduceEntityIds } from '../../common/services/helpers';

const createView = async (ipAddress: string, nominationId: string) => {
  const viewExists = await prisma.nominationView.findFirst({
    where: { ipAddress, nominationId },
  });

  if (viewExists) return null;

  return await prisma.nominationView.create({
    data: {
      ipAddress,
      nominationId,
    },
  });
};

const getView = async (nominaitionId: string) => {
  return await prisma.nominationView.count({
    where: { nominationId: nominaitionId },
  });
};

const getNominationBulkCount = async (nominationIds: string[]) => {
  const nominationViewsCount = await groupNominationViewByCount(nominationIds);
  return reduceEntityIds(nominationIds, nominationViewsCount, 'nominationId');
};

const groupNominationViewByCount = async (nominationIds: string[]) => {
  return await prisma.nominationView.groupBy({
    by: ['nominationId'],
    where: {
      nominationId: {
        in: nominationIds,
      },
    },
    _count: {
      nominationId: true,
    },
  });
};

export default { createView, getView, getNominationBulkCount };
