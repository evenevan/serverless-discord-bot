export interface Env {
    DATABASE_URL: string,
    DISCORD_TOKEN: string,
    DISCORD_PUBLIC_KEY: string,
    QUESTIONS: KVNamespace;
}

export interface EnvDeploy {
    DATABASE_URL: string,
    DISCORD_APPLICATION_ID: string,
    DISCORD_TOKEN: string,
    DISCORD_PUBLIC_KEY: string,
}
