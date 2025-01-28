const bcrypt = require('bcrypt');
const crypto = require('crypto');
import { publicConfig } from '../config/constants';

export function getEnumValues(enumType: any) {
  return Object.values(enumType);
}

export const generatePasswordHash = async (
  password: string,
): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const generateHash = (data: string) => {
  return crypto
    .createHmac('sha256', publicConfig.crypto_secret)
    .update(data)
    .digest('hex');
};

export const validatePasswordHash = async (
  data: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(data, hashedPassword);
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(16).toString('hex');
};
