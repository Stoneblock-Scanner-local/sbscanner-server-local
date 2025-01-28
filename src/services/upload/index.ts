import cloudinaryService from '../../common/services/cloudinary';
import mediaService from '../../common/services/media';
import { MediaTypes } from '../../common/types/media';
import { File } from '../../common/types/media';

export enum ProcessingMode {
  Resize,
  Compress,
  None,
}

const upload = async (
  file: File,
  folder?: string,
  processingMode: ProcessingMode = ProcessingMode.None,
) => {
  // transformation
  const processedFile = await process(file, processingMode);

  // Get uri from buffer
  const dataUri = mediaService.generateDataURIFromFileBuffer(
    processedFile.buffer,
    processedFile.mimetype,
  );

  const { mediaType, extension } = mediaService.getMediaType(file);

  return await uploadMedia(dataUri, mediaType, extension, folder);
};

const uploadMedia = async (
  dataUri: string,
  mediaType?: MediaTypes,
  extension?: string,
  folder?: string,
) => {
  switch (mediaType) {
    case MediaTypes.PRESENTATION:
      return await cloudinaryService.uploadPresentation(
        dataUri,
        extension,
        folder,
      );
    case MediaTypes.IMAGE:
      return await cloudinaryService.uploadImage(dataUri, folder);
  }
};

const process = (file: File, processingMode: ProcessingMode) => {
  switch (processingMode) {
    case ProcessingMode.Resize:
      return resize(file);
    case ProcessingMode.Compress:
      // MAYBE ADD COMPRESSION LATER
      return file;
    case ProcessingMode.None:
      return file;
  }
};

const resize = async (file: File) => {
  const resizedFile = await mediaService.resize(file, 500, 500);

  return checkProcessingData(file, resizedFile);
};

const checkProcessingData = (originalFile: File, processedFile: Buffer) => {
  return processedFile
    ? {
        originalname: originalFile.originalname,
        mimetype: originalFile.mimetype,
        buffer: processedFile,
        size: processedFile.length,
      }
    : originalFile;
};

export default { upload };
