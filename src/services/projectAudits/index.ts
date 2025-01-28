import prisma from '../../common/config/prisma';
import { ProjectAuditForm } from '@prisma/client';

const create = async (projectAudit: ProjectAuditForm) => {
  return await prisma.projectAuditForm.create({
    data: {
      name: projectAudit.name,
      description: projectAudit.description,
      website: projectAudit.website,
      contactName: projectAudit.contactName,
      founderDescription: projectAudit.founderDescription,
      presentationSrc: projectAudit.presentationSrc,
      categories: projectAudit.categories,
      socialEmail: projectAudit.socialEmail,
      socialX: projectAudit.socialX,
      socialDiscord: projectAudit.socialDiscord,
      socialInstagram: projectAudit.socialInstagram,
      otherInfo: projectAudit.otherInfo,
      creatorId: projectAudit.creatorId,
    },
  });
};

const getAll = async (skip: number, take: number) => {
  return await prisma.projectAuditForm.findMany({
    include: {
      creator: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    skip,
  });
};

const getById = async (id: string) => {
  return await prisma.projectAuditForm.findUnique({
    where: { id },
  });
};

const deleteById = async (id: string) => {
  return await prisma.projectAuditForm.delete({
    where: {
      id,
    },
  });
};

export default { create, getAll, deleteById, getById };
