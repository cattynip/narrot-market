declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      TWILIO_ACCOUNT_KEY: string;
      TWILIO_SID_KEY: string;
      TWILIO_SID_TOKEN: string;
    }
  }
}

export {};
