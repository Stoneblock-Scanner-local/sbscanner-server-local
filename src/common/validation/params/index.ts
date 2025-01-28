import { isValidUUID } from '../utils';

const { param } = require('express-validator');

export const CustomParamValidator = (
  name: string,
  validator: (val: any) => boolean,
  message: string,
) => [param(name).custom(validator).withMessage(message)];

export const IdParamValidator = CustomParamValidator(
  'id',
  isValidUUID,
  'Invalid UUID',
);

export default { CustomParamValidator, IdParamValidator };
