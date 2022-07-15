import { type APIInteractionResponse } from 'discord-api-types/v10';
import { locales } from '../locales/locales';

export const cooldown = 5000;

export const cooldownLimit = 1;

export const defaultLocale: keyof typeof locales = 'en-US';

export const defaultResponse: Partial<APIInteractionResponse> = {
    data: {
        allowed_mentions: {
            parse: [],
        },
    },
};

export const owners: string[] = ['304778919368982530'];

export const restRequestTimeout: number = 5000;

export const retryLimit: number = 3;

export const root: string = 'https://discord.com/api/v10';