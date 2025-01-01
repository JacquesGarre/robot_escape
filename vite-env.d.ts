interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly MODE: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
}