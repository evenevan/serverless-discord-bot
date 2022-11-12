import { DiscordSnowflake } from '@sapphire/snowflake';
import {
    type APIChatInputApplicationCommandInteraction,
    ApplicationCommandType,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/temp';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

export class PingCommand extends Command {
    public constructor(env: Env) {
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

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
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
