import { locales } from '../locales/locales';

export const defaultLocale: keyof typeof locales = 'en-US';

export const restRequestTimeout: number = 5000;

export const retryLimit: number = 3;

export const root: string = 'https://discord.com/api/v10/';