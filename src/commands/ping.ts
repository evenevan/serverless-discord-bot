import { DiscordSnowflake } from '@sapphire/snowflake';
import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { Command } from '../@types/Command';
import { APIResponse } from '../structures/APIResponse';

export class PingCommand implements Command {
    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public constructor() {
        this.structure = {
            name: 'ping',
            description: 'Pong!',
        };
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        const startTime = DiscordSnowflake.timestampFrom(interaction.id);
        const endTime = Date.now();

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                allowed_mentions: {
                    parse: [],
                },
                content: i18n.getMessage(
                    'commandsPingReply', [
                        endTime - startTime,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}

/**
 * fetch(`${root}/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}/messages/@original`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DiscordBot (https://discord-test.attituding.workers.dev, 10)',
            },
            body: JSON.stringify({
                content: i18n.getMessage(
                    'commandsPingFollowUp', [
                        endTime - startTime,
                    ],
                ),
            }),
        })
 */

/**
 * await fetch(`${root}/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: 'e',
                flags: MessageFlags.Ephemeral,
            }),
        });
 */