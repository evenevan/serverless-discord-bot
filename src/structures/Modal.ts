import { type APIModalSubmitInteraction } from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from './APIResponse';

export abstract class Modal {
    public readonly env: ENV;

    public readonly customID: string;

    public constructor({
        env,
        customID,
    }: {
        env: ENV,
        customID: string,
    }) {
        this.env = env;
        this.customID = customID;
    }

    public abstract respond(interaction: APIModalSubmitInteraction): Promise<APIResponse>;
}