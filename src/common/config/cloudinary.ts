import { v2 as cloudinary } from 'cloudinary';
import { publicConfig } from './constants';

cloudinary.config({
  cloud_name: publicConfig.cloudinary.cloud_name,
  api_key: publicConfig.cloudinary.api_key,
  api_secret: publicConfig.cloudinary.api_secret,
  secure: true,
});

export default cloudinary;
