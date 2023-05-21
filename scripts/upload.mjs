import fs from "fs";

// https://developers.google.com/photos/library/guides/upload-media

const authToken = "123";

// svg files cause upload to fail, what a world!

export const uploadFile = async (fileName, file) => {
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
        albumId:
          "AA6CZZhByy-ihxrBvQjFtYr4VqZ91I0AYJI-IWiJUuus7arbQPERNRP4YasnW_s1YJ991HNySH6L",
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

const getUploadToken = async (authToken, fileName, file) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/octet-stream");
  headers.append("Content-Length", file.length.toString());
  headers.append("X-Goog-Upload-File-Name", fileName);
  headers.append("X-Goog-Upload-Content-Type", "image/x-icon");
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

const x = async () => {
  const file = fs.readFileSync("./public/favicon.ico");
  const r = await uploadFile("test", file);
  console.log({ ...r.newMediaItemResults[0] });
};
x();
