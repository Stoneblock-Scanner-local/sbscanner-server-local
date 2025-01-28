import { Response, Request, NextFunction } from 'express';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '../../common/utils/constants';
import { ProjectsQueryDto } from '../../routes/projects/dto/query/GetProjectsQueryDto';
import {
  ContentTypes,
  ProjectAuditPostDto,
} from '../../common/types/contentful';
import { createCustomError } from '../../errors/custom-error';
import { projectCategoryDtoConverter } from '../../routes/nominations/dto/helpers';
import deliveryClient from '../../common/config/contentful';

const getProjects = async (
  req: Request<{}, {}, {}, ProjectsQueryDto>,
  res: Response,
) => {
  const {
    skip = DEFAULT_PAGINATION_SKIP,
    take = DEFAULT_PAGINATION_TAKE,
    category,
    searchTerm,
  } = req.query;

  const requestConfig: any = {
    content_type: ContentTypes.ProjectAuditPost,
    'fields.category': category && projectCategoryDtoConverter(category),
    'fields.featured[ne]': true,
    'fields.title[match]': searchTerm,
    skip: skip,
    limit: take,
  };

  const response = await deliveryClient.getEntries(requestConfig);

  const projects = response.items.map((item) => {
    const project = new ProjectAuditPostDto(item);
    return { ...project };
  });

  return res.status(200).json(projects);
};

const getProjectBySlug = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { slug } = req.params;

  const response = await deliveryClient.getEntries({
    content_type: ContentTypes.ProjectAuditPost,
    'fields.slug': slug,
  });

  if (response.items.length > 0) {
    const project = new ProjectAuditPostDto(response.items[0]);

    return res.status(200).json(project);
  } else {
    return next(
      createCustomError('There is no project that matches your slug', 404),
    );
  }
};

const getFeaturedProject = async (req: Request, res: Response) => {
  const response = await deliveryClient.getEntries({
    content_type: ContentTypes.ProjectAuditPost,
    'fields.featured': true,
    limit: 1,
  });

  if (response.items.length > 0) {
    const project = new ProjectAuditPostDto(response.items[0]);
    return res.status(200).json(project);
  } else {
    return res.status(200).json({});
  }
};

export { getProjects, getProjectBySlug, getFeaturedProject };
