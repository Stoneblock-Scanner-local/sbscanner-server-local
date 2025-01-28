import cloudinary from '../config/cloudinary';
import { ResourceType } from '../types/media';

export const uploadPresentation = async (
  dataUri: string,
  extension?: string,
  folder?: string,
) => {
  return await uploadFile(
    dataUri,
    folder ? folder : 'presentation',
    ResourceType.RAW,
    extension,
  );
};

export const uploadImage = async (dataUri: string, folder?: string) => {
  return await uploadFile(
    dataUri,
    folder ? folder : 'image',
    ResourceType.IMAGE,
    'webp',
  );
};

const uploadFile = async (
  dataUri: string,
  folder: string,
  resourceType: ResourceType,
  format?: string,
) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(dataUri, {
      resource_type: resourceType,
      folder,
      format,
    });

    return secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default { uploadPresentation, uploadImage };
