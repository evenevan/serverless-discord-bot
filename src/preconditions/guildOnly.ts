import { isGuildInteraction } from 'discord-api-types/utils/v10';
import {
    type APIApplicationCommandInteraction,
    type APIBaseInteraction,
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    InteractionResponseType,
    InteractionType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import type { Command } from '../structures/Command';
import { Precondition } from '../structures/Precondition';

export class GuildOnlyPrecondition extends Precondition {
    public constructor(env: Env) {
        super({
            env: env,
            name: 'guildOnly',
        });
    }

    public override async chatInput(command: Command, interaction: APIChatInputApplicationCommandInteraction) {
        return this.guildOnly(command, interaction);
    }

    public override async contextMenu(command: Command, interaction: APIContextMenuInteraction) {
        return this.guildOnly(command, interaction);
    }

    public async guildOnly(command: Command, interaction: APIApplicationCommandInteraction) {
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
