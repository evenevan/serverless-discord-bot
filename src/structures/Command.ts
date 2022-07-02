import {
    APIChatInputApplicationCommandInteraction,
    APIContextMenuInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';

/* eslint-disable max-len */

export abstract class Command {
    public readonly env: ENV;

    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public readonly guildIDs?: string[];

    constructor({
        env,
        structure,
        guildIDs,
    }: {
        env: ENV,
        structure: RESTPostAPIApplicationCommandsJSONBody
        guildIDs?: string[],
    }) {
        this.env = env;

        this.structure = structure;

        this.guildIDs = guildIDs;
    }

    chatInput?(interaction: APIChatInputApplicationCommandInteraction): Promise<APIResponse>;

    contextMenu?(interaction: APIContextMenuInteraction): Promise<APIResponse>;
}