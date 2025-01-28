export type File =
  | Express.Multer.File
  | {
      originalname: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    };

export enum ResourceType {
  RAW = 'raw',
  IMAGE = 'image',
}

export enum MediaTypes {
  IMAGE = 'image',
  PRESENTATION = 'presentation',
}

export enum PresentationTypes {
  PPT = 'application/vnd.ms-powerpoint',
  PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  KEY = 'application/vnd.apple.keynote',
  ODP = 'application/vnd.oasis.opendocument.presentation',
  PDF = 'application/pdf',
}

export enum ImageTypes {
  PNG = 'image/png',
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  WEBP = 'image/webp',
  GIF = 'image/gif',
}
