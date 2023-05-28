declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_SHEETNAME: string;
      GOOGLE_SERVICEACCOUNT_private_key: string;
      GOOGLE_SERVICEACCOUNT_client_email: string;
      GOOGLE_OAUTH_client_id: string;
      GOOGLE_OAUTH_client_secret: string;
      APP_DOMAIN: string;
    }
  }
}

export {};
