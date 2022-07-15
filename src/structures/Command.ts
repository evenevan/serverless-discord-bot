import {
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    type RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';
import {
    cooldown as defaultCooldown,
    cooldownLimit as defaultCooldownLimit,
} from '../utility/Constants';
import { type preconditions as preconditionsType } from '../preconditions';

export abstract class Command {
    public readonly env: ENV;

    public readonly preconditions: (keyof typeof preconditionsType)[];

    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public readonly cooldown: number;

    public readonly cooldownLimit: number;

    public readonly guildIDs?: string[];

    constructor({
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
}