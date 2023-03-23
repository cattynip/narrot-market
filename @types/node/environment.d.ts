declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      TWILIO_ASID: string;
      TWILIO_MSID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_PHONE_NUMBER: string;
      SESSION_PASSWORD: string;
      CLOUDFLARE_TOKEN: string;
      CLOUDFLARE_ACCOUNT_ID: string;
      SECRET_TOKEN: string;
    }
  }
}

declare module 'iron-session' {
  interface SessionData {
    user?: {
      id: number;
    };
  }
}

export {};
