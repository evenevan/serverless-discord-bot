import {
    type APIApplicationCommandInteraction,
    type APIBaseInteraction,
    type APIChatInputApplicationCommandInteraction,
    APIContextMenuInteraction,
    APIUser,
    InteractionResponseType,
    InteractionType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/temp';
import { APIResponse } from '../structures/APIResponse';
import type { Command } from '../structures/Command';
import { Precondition } from '../structures/Precondition';
import { owners } from '../utility/Constants';

export class OwnerOnlyPrecondition extends Precondition {
    public constructor(env: Env) {
        super({
            env: env,
            name: 'ownerOnly',
        });
    }

    public override async chatInput(command: Command, interaction: APIChatInputApplicationCommandInteraction) {
        return this.ownerOnly(command, interaction);
    }

    public override async contextMenu(command: Command, interaction: APIContextMenuInteraction) {
        return this.ownerOnly(command, interaction);
    }

    public async ownerOnly(command: Command, interaction: APIApplicationCommandInteraction) {
        const user = (interaction.member?.user ?? interaction.user) as APIUser;

        if (owners.includes(user.id)) {
            return undefined;
        }

        console.warn(
            `${this.constructor.name}:`,
            'User failed ownerOnly precondition.',
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
                    'preconditionOwnerOnly',
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
