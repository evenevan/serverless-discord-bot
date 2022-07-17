import { DiscordSnowflake } from '@sapphire/snowflake';
import {
    type APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

export class PingCommand extends Command {
    public constructor(env: ENV) {
        super({
            env: env,
            preconditions: ['cooldown'],
            structure: {
                name: 'ping',
                description: 'Pong!',
            },
        });
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        const startTime = DiscordSnowflake.timestampFrom(interaction.id);
        const endTime = Date.now();

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsPingResponse', [
                        endTime - startTime,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}