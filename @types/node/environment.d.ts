declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      TWILIO_ASID: string;
      TWILIO_MSID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_PHONE_NUMBER: string;
      SESSION_PASSWORD: string;
    }
  }
}

export {};
