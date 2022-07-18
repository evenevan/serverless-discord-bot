import {
    InteractionResponseType,
    type APIApplicationCommandAutocompleteInteraction,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Autocomplete } from '../structures/Autocomplete';

export class TestAutoComplete extends Autocomplete {
    public constructor(env: ENV) {
        super({
            env: env,
            name: 'test',
            subcommandGroup: 'subcommandgroup',
            subcommand: 'subcommand',
        });
    }

    public async respond(interaction: APIApplicationCommandAutocompleteInteraction) {
        return new APIResponse({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: [
                    {
                        name: `${interaction.data.name} ${Date.now()}`,
                        value: `${interaction.data.name} ${Date.now()}`,
                    },
                ],
            },
        });
    }
}