import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let client: S3;
const getClient = () => {
  if (!client) {
    client = new S3({
      region: process.env.NEXT_PUBLIC_S3_REGION,
    });
  }
  return client;
};

const getUploadUrl = (key: string) => {
  const s3Client = getClient();
  return getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: key,
    }),
    { expiresIn: 3600 }
  );
};

const uploadObject = (key: string, body: Buffer) => {
  const s3Client = getClient();
  return s3Client.putObject({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: key,
    Body: body,
  });
};

export default {
  getUploadUrl,
  uploadObject,
};
