import {
    APIChatInputApplicationCommandInteraction,
    APIContextMenuInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';

/* eslint-disable max-len */

export abstract class Command {
    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public readonly guildIDs?: string[];

    constructor({
        structure,
        guildIDs,
    }: {
        structure: RESTPostAPIApplicationCommandsJSONBody
        guildIDs?: string[],
    }) {
        this.structure = structure;

        this.guildIDs = guildIDs;
    }

    chatInput?(interaction: APIChatInputApplicationCommandInteraction, env: ENV): Promise<APIResponse>;

    contextMenu?(interaction: APIContextMenuInteraction, env: ENV): Promise<APIResponse>;
}