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
        const message = await new Request().request(`${root}/channels/621774933252374592/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: 'hi',
            }),
        });

        console.log(JSON.stringify(await message.json(), undefined, 2));

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: 'hi',
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}