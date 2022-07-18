import { type APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from './APIResponse';

export abstract class Autocomplete {
    public readonly env: ENV;

    public readonly name: string;

    public readonly subcommandGroup: string | null;

    public readonly subcommand: string | null;

    public constructor({
        env,
        name,
        subcommandGroup,
        subcommand,
    }: {
        env: ENV,
        name: string,
        subcommandGroup?: string,
        subcommand?: string,
    }) {
        this.env = env;
        this.name = name;
        this.subcommandGroup = subcommandGroup ?? null;
        this.subcommand = subcommand ?? null;
    }

    public abstract respond(interaction: APIApplicationCommandAutocompleteInteraction): Promise<APIResponse>;
}