import { type APIMessageComponentInteraction } from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from './APIResponse';

export abstract class Component<T extends APIMessageComponentInteraction> {
    public readonly env: ENV;

    public readonly name: string;

    public constructor({
        env,
        name,
    }: {
        env: ENV,
        name: string,
    }) {
        this.env = env;
        this.name = name;
    }

    public abstract respond(interaction: T): Promise<APIResponse>;
}