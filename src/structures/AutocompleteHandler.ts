import { ApplicationCommandOptionType, type APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { autocompletes } from '../autocompletes';
import { APIResponse } from './APIResponse';

export class AutocompleteHandler {
    public readonly env: ENV;

    public constructor(env: ENV) {
        this.env = env;
    }

    public handle(interaction: APIApplicationCommandAutocompleteInteraction) {
        const { options } = interaction.data;

        const { name } = interaction.data;
        let subcommandGroup: string | null = null;
        let subcommand: string | null = null;

        if (options[0].type === ApplicationCommandOptionType.SubcommandGroup) {
            subcommandGroup = options[0].name;
            subcommand = options[0].options[0].name;
        } else if (options[0].type === ApplicationCommandOptionType.Subcommand) {
            subcommand = options[0].name;
        }

        const Autocomplete = autocompletes.find((AutocompleteInstance) => {
            const instance = new AutocompleteInstance(this.env);

            return (
                instance.name === name
                && instance.subcommandGroup === subcommandGroup
                && instance.subcommand === subcommand
            );
        });

        if (Autocomplete) {
            return new Autocomplete(this.env).respond(interaction);
        }

        console.warn(
            `${this.constructor.name}:`,
            'Received autocomplete interaction that was not found in export.',
            `Name: ${name}.`,
            `Subcommand Ggroup: ${subcommandGroup}.`,
            `Subcommand: ${subcommand}.`,
        );

        return new APIResponse(null, {
            status: 400,
        });
    }
}