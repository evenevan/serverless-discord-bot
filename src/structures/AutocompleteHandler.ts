import type { APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { commands } from '../commands';
import { APIResponse } from './APIResponse';

export class AutocompleteHandler {
    public readonly env: Env;

    public constructor(env: Env) {
        this.env = env;
    }

    public handle(interaction: APIApplicationCommandAutocompleteInteraction) {
        const Command = commands[interaction.data.name];

        if (Command) {
            return new Command(this.env).autocomplete!(interaction);
        }

        console.warn(
            `${this.constructor.name}:`,
            'Received autocomplete command was not found in export.',
            `Command: ${interaction.data.name}.`,
        );

        return new APIResponse(null, {
            status: 400,
        });
    }
}
