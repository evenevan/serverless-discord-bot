import {
    APIChatInputApplicationCommandInteraction,
    APIContextMenuInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { APIResponse } from '../structures/APIResponse';
import { ENV } from './ENV';

export interface Command {
    structure: RESTPostAPIApplicationCommandsJSONBody,
    chatInput?: (interaction: APIChatInputApplicationCommandInteraction, env: ENV) => Promise<APIResponse>
    contextMenu?: (interaction: APIContextMenuInteraction, env: ENV) => Promise<APIResponse>
}