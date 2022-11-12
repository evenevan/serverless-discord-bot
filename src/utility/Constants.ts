import type { APIInteractionResponse } from 'discord-api-types/v10';
import type { locales } from '../locales/locales';

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

export const owners: string[] = [
    '304778919368982530',
    '818616124332965888',
];

export const restRequestTimeout: number = 5000;

export const retryLimit: number = 3;

export const APIRoot = 'https://discord.com/api/v10';

export const CDNRoot = 'https://cdn.discordapp.com';
