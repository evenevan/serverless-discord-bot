import { InteractionOptionResolver } from '@sapphire/discord-utilities';
import { DiscordSnowflake } from '@sapphire/snowflake';
import {
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

export class SnowflakeCommand extends Command {
    public constructor(env: Env) {
        super({
            name: 'snowflake',
            description: 'Deconstruct a snowflake',
            env: env,
            preconditions: ['cooldown'],
        });

        this.structure = {
            chatInput: {
                name: this.name,
                description: this.description,
                options: [
                    {
                        name: 'snowflake',
                        description: 'snowflake',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
                type: ApplicationCommandType.ChatInput,
            },
            message: {
                name: this.name,
                type: ApplicationCommandType.Message,
            },
            user: {
                name: this.name,
                type: ApplicationCommandType.User,
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        // @ts-ignore i have no idea why this doesn't work
        const options = new InteractionOptionResolver(interaction);

        const snowflake = options.getString('snowflake', true);

        const { timestamp } = DiscordSnowflake.deconstruct(snowflake);

        const cleanTimestamp = Math.round(Number(timestamp) / 1000);

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `<t:${cleanTimestamp}:D>\n<t:${cleanTimestamp}:T>\n<t:${cleanTimestamp}:R>`,
                flags: MessageFlags.Ephemeral,
            },
        });
    }

    public override async contextMenu(interaction: APIContextMenuInteraction) {
        const options = new InteractionOptionResolver(
            // @ts-ignore i have no idea why this doesn't work
            interaction as APIApplicationCommandInteraction,
        );

        const id = interaction.data.type === ApplicationCommandType.User
            ? options.getTargetUser().id
            : options.getTargetMessage().id;

        const { timestamp } = DiscordSnowflake.deconstruct(id);

        const cleanTimestamp = Math.round(Number(timestamp) / 1000);

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `<t:${cleanTimestamp}:D>\n<t:${cleanTimestamp}:T>\n<t:${cleanTimestamp}:R>`,
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
