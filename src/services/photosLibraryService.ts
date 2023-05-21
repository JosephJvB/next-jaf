const albumId =
  "AIDwr4s0JXGCCECnBAXIi7-YJl-IeyoaMl0O03dA9iNLFsyYyOvjoTh6tS3PJmaAxVGk-jsk0ZOy";

export const uploadFile = async (
  authToken: string,
  fileName: string,
  file: File
) => {
  const uploadToken = await getUploadToken(authToken, fileName, file);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");
  const res = await fetch(
    "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        albumId,
        newMediaItems: [
          {
            description: "plant image",
            simpleMediaItem: {
              fileName,
              uploadToken,
            },
          },
        ],
      }),
    }
  );
  if (!res.ok) {
    throw res;
  }

  return res.json();
};

// https://developers.google.com/photos/library/guides/upload-media#uploading-bytes
const getUploadToken = async (
  authToken: string,
  fileName: string,
  file: File
) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/octet-stream");
  headers.append("Content-Length", file.size.toString());
  headers.append("X-Goog-Upload-File-Name", fileName);
  headers.append("X-Goog-Upload-Content-Type", file.type);
  headers.append("X-Goog-Upload-Protocol", "raw");
  const res = await fetch("https://photoslibrary.googleapis.com/v1/uploads", {
    method: "POST",
    headers,
    body: file,
  });
  if (!res.ok) {
    throw res;
  }
  return res.text();
};

export const getAlbums = async (authToken: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  const res = await fetch("https://photoslibrary.googleapis.com/v1/albums", {
    method: "GET",
    headers,
  });
  if (!res.ok) {
    throw res;
  }
  const x = await res.json();
  console.log({ x });
};

export const createAlbum = async (authToken: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");
  const res = await fetch("https://photoslibrary.googleapis.com/v1/albums", {
    method: "POST",
    headers,
    body: JSON.stringify({
      album: {
        title: "plants",
      },
    }),
  });
  if (!res.ok) {
    throw res;
  }
  const j = await res.json();
  console.log({ j });
};
