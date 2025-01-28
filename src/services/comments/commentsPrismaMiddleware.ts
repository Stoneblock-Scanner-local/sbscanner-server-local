import { Prisma } from '@prisma/client';

const commentsPrismaMiddleware: Prisma.Middleware = async (
  params: Prisma.MiddlewareParams,
  next,
) => {
  if (params.model == 'NominationComment') {
    if (params.action == 'delete') {
      params.action = 'update';
      params.args['data'] = { deleted: true };
    }
  }
  return next(params);
};

export default commentsPrismaMiddleware;
