import { Request, Response, NextFunction } from 'express';
import projectAuditsService from '../../services/projectAudits';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '../../common/utils/constants';
import { ProjectAuditForm } from '@prisma/client';
import { ProjectAuditsQueryDto } from '../../routes/projectAudits/dto/query/GetProjectAuditsQueryDto';
import UserDto from '../../routes/users/dto/UserDto';
import { noRecordException } from '../../errors/no-record-exception';
import { createCustomError } from '../../errors/custom-error';

const createProjectAudit = async (
  req: Request<{}, {}, ProjectAuditForm>,
  res: Response,
) => {
  const projectAudit = await projectAuditsService.create({
    ...req.body,
    creatorId: req.session.user.id,
  });

  return res.status(200).json(projectAudit);
};

const getProjectAudits = async (
  req: Request<{}, {}, {}, ProjectAuditsQueryDto>,
  res: Response,
) => {
  const { skip = DEFAULT_PAGINATION_SKIP, take = DEFAULT_PAGINATION_TAKE } =
    req.query;

  const projectAudits = await projectAuditsService.getAll(+skip, +take);

  const projectAuditsDto = projectAudits.map((project) => ({
    ...project,
    creator: new UserDto(project.creator),
  }));

  return res.status(200).json(projectAuditsDto);
};

const getProjectAudit = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const projectAudit = await projectAuditsService.getById(req.params.id);

  if (!projectAudit)
    return next(createCustomError('Project audit not found', 400));

  return res.status(200).json(projectAudit);
};

const deleteProjectAudit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectAudit = await projectAuditsService.deleteById(req.params.id);

    return res
      .status(200)
      .json({ message: `Project audit with id: ${projectAudit?.id} deleted` });
  } catch (e: any) {
    noRecordException(e, next);
  }
};

export {
  createProjectAudit,
  getProjectAudits,
  deleteProjectAudit,
  getProjectAudit,
};
