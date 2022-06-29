import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { Command } from '../@types/Command';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';

export class InviteCommand implements Command {
    structure: RESTPostAPIApplicationCommandsJSONBody;

    constructor() {
        this.structure = {
            name: 'invite',
            description: 'Get an invite link to add the bot to your server',
        };
    }

    async chatInput(interaction: APIChatInputApplicationCommandInteraction, env: ENV) {
        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `https://discord.com/api/oauth2/authorize?client_id=${env.DISCORD_APPLICATION_ID}&permissions=2048&scope=applications.commands%20bot`,
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}