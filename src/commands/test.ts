import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { Command } from '../@types/Command';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { Request } from '../structures/Request';
import { root } from '../utility/Constants';

export class TestCommand implements Command {
    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public constructor() {
        this.structure = {
            name: 'test',
            description: 'TESTING',
        };
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
                allowed_mentions: {
                    parse: [],
                },
                content: i18n.getMessage('commandsTestReply'),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}