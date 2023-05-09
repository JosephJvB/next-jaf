import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let client: S3;
const getClient = () => {
  if (!client) {
    client = new S3({
      region: process.env.NEXT_PUBLIC_S3_REGION,
      credentials: fromEnv(),
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

export default {
  getUploadUrl,
};
