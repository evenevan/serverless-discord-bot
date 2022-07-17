import {
    type APIChatInputApplicationCommandInteraction,
    type APIDMChannel,
    InteractionResponseType,
    MessageFlags,
    ComponentType,
    ButtonStyle,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { root } from '../utility/Constants';

export class TestCommand extends Command {
    public constructor(env: ENV) {
        super({
            env: env,
            preconditions: ['cooldown', 'ownerOnly'],
            structure: {
                name: 'test',
                description: 'TESTING',
            },
            cooldown: 10000,
        });
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        const response = await fetch(`${root}/users/@me/channels`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipient_id: (interaction.member?.user ?? interaction.user)!.id,
            }),
        });

        const channel = await response.json() as APIDMChannel;

        await fetch(`${root}/channels/${channel.id}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: i18n.getMessage('commandsTestSend'),
            }),
        });

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage('commandsTestReply'),
                flags: MessageFlags.Ephemeral,
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: 'Test',
                                style: ButtonStyle.Primary,
                                custom_id: 'test',
                            },
                        ],
                    },
                ],
            },
        });
    }
}

/**
 * const message = await new Request().request(`${root}/channels/${interaction.channel_id}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                allowed_mentions: {
                    parse: [],
                },
                content: i18n.getMessage('commandsTestSend'),
            }),
        });
 */