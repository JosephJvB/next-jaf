declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_KEY_ID: string;
      AWS_SECRET_KEY: string;
      NEXT_PUBLIC_S3_REGION: string;
      NEXT_PUBLIC_S3_BUCKET: string;
      DYNAMODB_REGION: string;
      GOOGLE_SERVICEACCOUNT_private_key: string;
      GOOGLE_SERVICEACCOUNT_client_email: string;
      GOOGLE_OAUTH_client_id: string;
      GOOGLE_OAUTH_client_secret: string;
      APP_DOMAIN: string;
    }
  }
}

export {};
