import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

export class InviteCommand extends Command {
    public constructor() {
        super({
            structure: {
                name: 'invite',
                description: 'Get an invite link to add the bot to your server',
            },
        });
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction, env: ENV) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsInviteReply', [
                        `https://discord.com/api/oauth2/authorize?client_id=${env.DISCORD_APPLICATION_ID}&permissions=2048&scope=applications.commands%20bot`,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}