import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { Command } from '../@types/Command';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { root } from '../utility/Constants';

export class TestCommand implements Command {
    structure: RESTPostAPIApplicationCommandsJSONBody;

    constructor() {
        this.structure = {
            name: 'test',
            description: 'TESTING',
        };
    }

    async chatInput(interaction: APIChatInputApplicationCommandInteraction, env: ENV) {
        console.log(env.DISCORD_TOKEN);
        const message = await fetch(`${root}/channels/621774933252374592/messages`, {
            method: 'post',
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