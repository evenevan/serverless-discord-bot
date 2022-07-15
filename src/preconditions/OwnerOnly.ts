import {
    type APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    type APIBaseInteraction,
    InteractionType,
    APIUser,
} from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { Precondition } from '../structures/Precondition';
import { owners } from '../utility/Constants';

export class OwnerOnlyPrecondition extends Precondition {
    public constructor(env: ENV) {
        super({
            env: env,
            name: 'ownerOnly',
        });
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const user = (interaction.member?.user ?? interaction.user) as APIUser;

        if (owners.includes(user.id)) {
            return undefined;
        }

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