import prisma from '../../common/config/prisma';
import { Nomination } from '@prisma/client';
import { ApprovalStage, ProjectCategory } from '@prisma/client';

const create = async (nomination: Nomination) => {
  return await prisma.nomination.create({
    data: {
      title: nomination.title,
      name: nomination.name,
      website: nomination.website,
      description: nomination.description,
      categories: nomination.categories,
      creatorId: nomination.creatorId,
      socialX: nomination.socialX,
      socialInstagram: nomination.socialInstagram,
      socialDiscord: nomination.socialDiscord,
      otherInfo: nomination.otherInfo,
    },
  });
};

const getAll = async (
  skip: number,
  take: number,
  category?: ProjectCategory,
  stage?: ApprovalStage,
  searchTerm?: string,
) => {
  return await prisma.nomination.findMany({
    include: {
      creator: true,
    },
    where: {
      ...(category
        ? {
            categories: {
              has: category,
            },
          }
        : {}),
      ...(stage
        ? {
            approvalStage: stage,
          }
        : {}),
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
  });
};

const deleteById = async (id: string) => {
  return await prisma.nomination.delete({
    where: {
      id,
    },
  });
};

const getById = async (id: string) => {
  return await prisma.nomination.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
    },
  });
};

const update = async (id: string, data: Partial<Nomination>) => {
  return await prisma.nomination.update({
    where: {
      id,
    },
    data,
  });
};

export default { create, getAll, deleteById, getById, update };
