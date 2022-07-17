import {
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from './APIResponse';
import { Command } from './Command';

export class Precondition {
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

    public chatInput?(command: Command, interaction: APIChatInputApplicationCommandInteraction): Promise<APIResponse | undefined>;

    public contextMenu?(command: Command, interaction: APIContextMenuInteraction): Promise<APIResponse | undefined>;
}