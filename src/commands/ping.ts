import { DiscordSnowflake } from '@sapphire/snowflake';
import {
    type APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    ApplicationCommandType,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

export class PingCommand extends Command {
    public constructor(env: ENV) {
        super({
            name: 'ping',
            description: 'Pong!',
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

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        const startTime = DiscordSnowflake.timestampFrom(interaction.id);
        const endTime = Date.now();

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsPingChatInputResponse', [
                        endTime - startTime,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}