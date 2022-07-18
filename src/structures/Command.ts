import {
    APIApplicationCommandAutocompleteInteraction,
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    type RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from './APIResponse';
import { type preconditions as preconditionsType } from '../preconditions';
import {
    cooldown as defaultCooldown,
    cooldownLimit as defaultCooldownLimit,
} from '../utility/Constants';

export class Command {
    public readonly env: ENV;

    public readonly preconditions: (keyof typeof preconditionsType)[];

    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public readonly cooldown: number;

    public readonly cooldownLimit: number;

    public readonly guildIDs?: string[];

    public constructor({
        env,
        preconditions,
        structure,
        cooldown,
        cooldownLimit,
        guildIDs,
    }: {
        env: ENV,
        preconditions: (keyof typeof preconditionsType)[],
        structure: RESTPostAPIApplicationCommandsJSONBody,
        cooldown?: number,
        cooldownLimit?: number,
        guildIDs?: string[],
    }) {
        this.env = env;

        this.preconditions = preconditions;

        this.structure = structure;

        this.cooldown = cooldown ?? defaultCooldown;

        this.cooldownLimit = cooldownLimit ?? defaultCooldownLimit;

        this.guildIDs = guildIDs;
    }

    public chatInput?(interaction: APIChatInputApplicationCommandInteraction): Promise<APIResponse>;

    public contextMenu?(interaction: APIContextMenuInteraction): Promise<APIResponse>;

    public autocomplete?(interaction: APIApplicationCommandAutocompleteInteraction): Promise<APIResponse>;
}