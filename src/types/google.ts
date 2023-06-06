export interface GoogleAlbum {
  id: string;
  title: string;
  productUrl: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId: string;
  isWriteable: boolean;
  mediaItemsCount: number;
}

export interface SimpleMediaItem {
  id: string;
  description: string;
  productUrl: string;
  mimeType: string;
  mediaMetadata: {
    creationTime: string;
    width: string;
    height: string;
  };
  filename: string;
}
export interface SimpleMediaItemResult {
  uploadToken: string;
  status: {
    message: string;
  };
  mediaItem: SimpleMediaItem;
}
export interface UploadResponse {
  newMediaItemResults: Array<{
    uploadToken: string;
    status: {
      message: string;
    };
    mediaItem: SimpleMediaItem;
  }>;
}
export interface MediaItem {
  id: string;
  description: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  filename: string;
  mediaMetadata: {
    width: string;
    height: string;
    creationTime: string | number;
    photo: {
      cameraMake: string;
      cameraModel: string;
      focalLength: string | number;
      apertureFNumber: string | number;
      isoEquivalent: any;
      exposureTime: string | number;
    };
  };
  contributorInfo: {
    profilePictureBaseUrl: string;
    displayName: string;
  };
}
export interface MediaItemResult {
  mediaItem: MediaItem;
  status: {
    message: string;
  };
}

export interface Colour {
  color: {
    red: number;
    green: number;
    blue: number;
  };
  score: number;
  pixelFraction: number;
}

export interface ImagePropertiesResponse {
  imagePropertiesAnnotation: {
    dominantColors: {
      colors: Colour[];
    };
  };
}
