export interface GoogleAlbum {
  id: string;
  title: string;
  productUrl: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId: string;
  isWriteable: boolean;
  mediaItemsCount: number;
}

export interface MediaItem {
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
export interface MediaItemResult {
  uploadToken: string;
  status: {
    message: string;
  };
  mediaItem: MediaItem;
}
export interface UploadResponse {
  newMediaItemResults: MediaItemResult[];
}
