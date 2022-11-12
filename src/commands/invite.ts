import {
    type APIChatInputApplicationCommandInteraction,
    ApplicationCommandType,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

export class InviteCommand extends Command {
    public constructor(env: Env) {
        super({
            name: 'invite',
            description: 'Get an invite link to add the bot to your server',
            env: env,
            preconditions: ['cooldown'],
        });

        this.structure = {
            chatInput: {
                name: this.name,
                description: this.description,
                type: ApplicationCommandType.ChatInput,
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsInviteChatInputResponse', [
                        `https://discord.com/api/oauth2/authorize?client_id=${this.env.DISCORD_APPLICATION_ID}&permissions=2048&scope=applications.commands%20bot`,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
