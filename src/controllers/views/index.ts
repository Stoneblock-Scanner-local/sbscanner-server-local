import { Response, Request } from 'express';
import viewsService from '../../services/views';

const setViewForNomination = async (
  req: Request<{ nominationId: string; ipAddress: string }>,
  res: Response,
) => {
  await viewsService.createView(req.params.ipAddress, req.params.nominationId);

  return res.status(200).json({ msg: 'Created' });
};

const getNominationView = async (
  req: Request<{ nominationId: string }>,
  res: Response,
) => {
  const view = await viewsService.getView(req.params.nominationId);

  return res.status(200).json(view);
};

const getNominationViewBulk = async (
  req: Request<{}, {}, {}, { ids: string[] | string }>,
  res: Response,
) => {
  const { ids } = req.query;

  const _ids = Array.isArray(ids) ? ids : [ids];

  const bulkCount = await viewsService.getNominationBulkCount(_ids);

  return res.status(200).json(bulkCount);
};
export { setViewForNomination, getNominationView, getNominationViewBulk };
