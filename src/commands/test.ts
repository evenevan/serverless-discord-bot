import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { Request } from '../structures/Request';
import { root } from '../utility/Constants';

export class TestCommand extends Command {
    public constructor() {
        super({
            structure: {
                name: 'test',
                description: 'TESTING',
            },
            guildIDs: ['873000534955667496'],
        });
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction, env: ENV) {
        const { i18n } = interaction;

        const message = await new Request().request(`${root}/channels/${interaction.channel_id}/messages`, {
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

        console.log(JSON.stringify(await message.json(), undefined, 2));

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage('commandsTestReply'),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}