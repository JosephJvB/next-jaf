declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_KEY_ID: string;
      AWS_SECRET_KEY: string;
      NEXT_PUBLIC_S3_REGION: string;
      NEXT_PUBLIC_S3_BUCKET: string;
      DYNAMODB_REGION: string;
    }
  }
}

export {};
