import { DiscordSnowflake } from '@sapphire/snowflake';
import {
    APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { Command } from '../@types/Command';
import { ENV } from '../@types/ENV';
import { Request } from '../structures/Request';
import { root } from '../utility/Constants';

export class PingCommand implements Command {
    public readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    public constructor() {
        this.structure = {
            name: 'ping',
            description: 'Pong!',
        };
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction, env: ENV) {
        await new Request().request(`${root}interactions/${interaction.id}/${interaction.token}/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: InteractionResponseType.DeferredChannelMessageWithSource,
                data: {
                    flags: MessageFlags.Ephemeral,
                },
            }),
        });

        const startTime = DiscordSnowflake.timestampFrom(interaction.id);
        const endTime = Date.now();

        return new Request().request(`${root}/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}/messages/@original`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `Pong! ${endTime - startTime}ms`,
            }),
        });
    }
}

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