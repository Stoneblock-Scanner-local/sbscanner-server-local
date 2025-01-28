import { MediaTypes } from '../types/media';
import { PRESENTATION_TYPES, IMAGE_TYPES } from '../utils/media';
import { File } from '../types/media';
import sharp from 'sharp';

const generateDataURIFromFileBuffer = (file: Buffer, type: string) => {
  const base64Encoded = Buffer.from(file.buffer).toString('base64');

  return `data:${type};base64,${base64Encoded}`;
};

const getMediaType = (file: File) => {
  const extension = file.originalname.split('.').pop();

  let mediaType;
  if (isPresentationFile(file)) {
    mediaType = MediaTypes.PRESENTATION;
  }

  if (isImageFile(file)) {
    mediaType = MediaTypes.IMAGE;
  }

  return { mediaType, extension };
};

const resize = async (file: File, width = 550, height = 550) => {
  return await sharp(file.buffer, { failOnError: false })
    .withMetadata()
    .resize({ width, height, withoutEnlargement: true })
    .toBuffer();
};

const isPresentationFile = (file: File) => {
  if (PRESENTATION_TYPES.includes(file.mimetype)) {
    return true;
  }

  return false;
};

const isImageFile = (file: File) => {
  if (IMAGE_TYPES.includes(file.mimetype)) {
    return true;
  }

  return false;
};

export default { generateDataURIFromFileBuffer, getMediaType, resize };
