import {
    InteractionResponseType,
    MessageFlags,
    type APIMessageComponentButtonInteraction,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Component } from '../structures/Component';

export class TestComponent extends Component<APIMessageComponentButtonInteraction> {
    public constructor(env: ENV) {
        super({
            env: env,
            name: 'test',
        });
    }

    public async respond(interaction: APIMessageComponentButtonInteraction) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsTestSend',
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}