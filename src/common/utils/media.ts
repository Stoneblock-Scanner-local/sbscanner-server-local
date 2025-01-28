import { PresentationTypes, ImageTypes } from '../types/media';
import { getEnumValues } from './helpers';

export const PRESENTATION_TYPES = getEnumValues(PresentationTypes);
export const IMAGE_TYPES = getEnumValues(ImageTypes);

const getSizeInMb = (fileSize: number) => {
  return (fileSize / 1024 / 1024) * 1.048576;
};

export { getSizeInMb };
