import prisma from '../../common/config/prisma';

const createRating = async (
  nominationId: string,
  raterId: string,
  rating: number,
  id?: string,
) => {
  return await prisma.nominationRating.upsert({
    where: {
      id: id || '',
    },
    create: {
      rate: rating,
      nominationId,
      raterId,
    },
    update: {
      rate: rating,
    },
  });
};

const getRatings = async (nominationId: string) => {
  return await prisma.nominationRating.findMany({
    where: {
      nominationId,
    },
    select: {
      rate: true,
    },
  });
};

const getAvarageRatings = async (nominationId: string) => {
  const ratings = await getRatings(nominationId);

  const totalRatings = ratings.reduce((sum, rate) => sum + rate.rate, 0);

  return totalRatings / ratings.length;
};

export default { createRating, getAvarageRatings };
