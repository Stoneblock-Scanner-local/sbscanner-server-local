import { Response, NextFunction, Request } from 'express';
import { createCustomError } from '../../errors/custom-error';
import uploadService from '../../services/upload';
import { ProcessingMode } from '../../services/upload';

const uploadPresentation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) return next(createCustomError('File not provided', 400));

  const secure_url = await uploadService.upload(req.file, 'presentation');

  return res.status(200).json(secure_url);
};

const uploadProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) return next(createCustomError('File not provided', 400));

  const secure_url = await uploadService.upload(
    req.file,
    'profile',
    ProcessingMode.Resize,
  );

  return res.status(200).json(secure_url);
};

export { uploadPresentation, uploadProfile };
