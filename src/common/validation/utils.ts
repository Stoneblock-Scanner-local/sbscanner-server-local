import { PRESENTATION_TYPES } from '../utils/media';
const uuid = require('uuid');

export const isValidUUID = (value: string) => {
  return uuid.validate(value);
};

export const isValidPresentationType = (type: string) => {
  if (!PRESENTATION_TYPES.includes(type)) {
    return false;
  }
  return true;
};
