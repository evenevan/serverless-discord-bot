import { isGuildInteraction } from 'discord-api-types/utils/v10';
import {
    type APIBaseInteraction,
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    InteractionResponseType,
    InteractionType,
    MessageFlags,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { type Command } from '../structures/Command';
import { Precondition } from '../structures/Precondition';

export class GuildOnlyPrecondition extends Precondition {
    public constructor(env: ENV) {
        super({
            env: env,
            name: 'guildOnly',
        });
    }

    public async chatInput(command: Command, interaction: APIChatInputApplicationCommandInteraction) {
        if (isGuildInteraction(interaction)) {
            return undefined;
        }

        console.warn(
            `${this.constructor.name}:`,
            'User failed guildOnly precondition.',
            `Command: ${command.name}.`,
            `User: ${interaction.member?.user.id ?? interaction.user?.id}.`,
        );

        return this.error(interaction);
    }

    public async contextMenu(command: Command, interaction: APIContextMenuInteraction) {
        if (isGuildInteraction(interaction)) {
            return undefined;
        }

        console.warn(
            `${this.constructor.name}:`,
            'User failed guildOnly precondition.',
            `Command: ${command.name}.`,
            `User: ${interaction.member?.user.id ?? interaction.user?.id}.`,
        );

        return this.error(interaction);
    }

    public async error(interaction: APIBaseInteraction<InteractionType, unknown>) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'preconditionGuildOnly',
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}