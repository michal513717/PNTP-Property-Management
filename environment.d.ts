declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string;
            MONGODB_DB_NAME: string;
            CHAT_GTP_KEY: string;
        }
    }
}

export {};