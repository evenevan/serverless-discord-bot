import Collection from '@discordjs/collection';
import { RateLimit, RateLimitManager } from '@sapphire/ratelimits';
import {
    type APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    type APIBaseInteraction,
    InteractionType,
} from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { Precondition } from '../structures/Precondition';

const cooldown: Collection<string, RateLimitManager> = new Collection();

export class CooldownPrecondition extends Precondition {
    public constructor(env: ENV) {
        super({
            env: env,
            name: 'cooldown',
        });
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction, command: Command) {
        const rateLimitManager = cooldown.ensure(
            command.structure.name,
            () => new RateLimitManager(command.cooldown, command.cooldownLimit),
        );

        const rateLimit = rateLimitManager.acquire(
            (interaction.member?.user ?? interaction.user)!.id,
        );

        if (rateLimit.limited) {
            return this.error(command, rateLimit, interaction);
        }

        rateLimit.consume();

        return undefined;
    }

    public async error(command: Command, context: RateLimit, interaction: APIBaseInteraction<InteractionType, unknown>) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'preconditionsCooldownError',
                    [
                        command.cooldownLimit,
                        command.cooldown / 1000,
                        (context.remainingTime / 1000).toFixed(1),
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}