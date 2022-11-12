import type {
    APIApplicationCommandAutocompleteInteraction,
    APIChatInputApplicationCommandInteraction,
    APIContextMenuInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import type { Env } from '../@types/temp';
import type { APIResponse } from './APIResponse';
import type { preconditions as preconditionsType } from '../preconditions';
import {
    cooldown as defaultCooldown,
    cooldownLimit as defaultCooldownLimit,
} from '../utility/Constants';

export class Command {
    public readonly name: string;

    public readonly description: string;

    public readonly env: Env;

    public readonly preconditions: (keyof typeof preconditionsType)[];

    public readonly cooldown: number;

    public readonly cooldownLimit: number;

    public readonly guildIDs?: string[];

    public structure!: {
        chatInput?: RESTPostAPIApplicationCommandsJSONBody,
        user?: RESTPostAPIApplicationCommandsJSONBody,
        message?: RESTPostAPIApplicationCommandsJSONBody,
    };

    public constructor({
        name,
        description,
        env,
        preconditions,
        cooldown,
        cooldownLimit,
        guildIDs,
    }: {
        name: string,
        description: string,
        env: Env,
        preconditions: (keyof typeof preconditionsType)[],
        cooldown?: number,
        cooldownLimit?: number,
        guildIDs?: string[],
    }) {
        this.name = name;

        this.description = description;

        this.env = env;

        this.preconditions = preconditions;

        this.cooldown = cooldown ?? defaultCooldown;

        this.cooldownLimit = cooldownLimit ?? defaultCooldownLimit;

        this.guildIDs = guildIDs;
    }

    public chatInput?(interaction: APIChatInputApplicationCommandInteraction): Promise<APIResponse>;

    public contextMenu?(interaction: APIContextMenuInteraction): Promise<APIResponse>;

    public autocomplete?(interaction: APIApplicationCommandAutocompleteInteraction): Promise<APIResponse>;
}
