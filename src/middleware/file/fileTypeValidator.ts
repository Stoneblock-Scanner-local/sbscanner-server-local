import { NextFunction, Response, Request } from 'express';
import { createCustomError } from '../../errors/custom-error';
import { MediaTypes } from '../../common/types/media';
import { PRESENTATION_TYPES, IMAGE_TYPES } from '../../common/utils/media';

export const fileTypeValidator = (mediaType: MediaTypes) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const fileType = req.file?.mimetype;

    if (
      mediaType === MediaTypes.PRESENTATION &&
      !PRESENTATION_TYPES.includes(fileType)
    ) {
      return next(
        createCustomError(
          `Invalid file type: ${fileType}, supported types are: .ppt, .pptx, .pdf, .odp and .key!`,
          415,
        ),
      );
    }

    if (fileType === MediaTypes.IMAGE && !IMAGE_TYPES.includes(fileType)) {
      return next(
        createCustomError(
          `Invalid file type: ${fileType}, supported types are: .png, .jpg, .webp and .jpeg!`,
          415,
        ),
      );
    }

    next();
  };
};
