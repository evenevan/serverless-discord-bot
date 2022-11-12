import type {
    APIChatInputApplicationCommandInteraction,
    APIContextMenuInteraction,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import type { APIResponse } from './APIResponse';
import type { Command } from './Command';

export class Precondition {
    public readonly env: Env;

    public readonly name: string;

    public constructor({
        env,
        name,
    }: {
        env: Env,
        name: string,
    }) {
        this.env = env;
        this.name = name;
    }

    public chatInput?(command: Command, interaction: APIChatInputApplicationCommandInteraction): Promise<APIResponse | undefined>;

    public contextMenu?(command: Command, interaction: APIContextMenuInteraction): Promise<APIResponse | undefined>;
}
