import {
    type APIModalSubmitInteraction,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Modal } from '../structures/Modal';

export class QuestionModal extends Modal {
    public constructor(env: Env) {
        super({
            env: env,
            customID: 'question',
        });
    }

    public async respond(interaction: APIModalSubmitInteraction) {
        const { i18n } = interaction;

        const { user } = JSON.parse(interaction.data.custom_id);

        const question = interaction.data.components[0]?.components[0]?.value;

        this.env.QUESTIONS.put(String(Date.now()), `User: ${user} Question: ${question}`);

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage('modalsQuestionResponse', [user, question]),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
