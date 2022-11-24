import {
    type APIModalSubmitInteraction,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Modal } from '../structures/Modal';

export class ExampleModal extends Modal {
    public constructor(env: Env) {
        super({
            env: env,
            customID: 'example',
        });
    }

    public async respond(interaction: APIModalSubmitInteraction) {
        const { i18n } = interaction;

        const valueOne = interaction.data.components[0]?.components[0]?.value ?? '';
        const valueTwo = interaction.data.components[1]?.components[0]?.value ?? '';

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage('modalsExampleResponse', [valueOne, valueTwo]),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
