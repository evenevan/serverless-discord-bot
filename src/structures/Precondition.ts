import {
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';
import { Command } from './Command';

/* eslint-disable max-len */

export abstract class Precondition {
    public readonly env: ENV;

    public readonly name: string;

    constructor({
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