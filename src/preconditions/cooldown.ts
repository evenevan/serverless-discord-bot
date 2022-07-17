import Collection from '@discordjs/collection';
import {
    RateLimit,
    RateLimitManager,
} from '@sapphire/ratelimits';
import {
    type APIChatInputApplicationCommandInteraction,
    InteractionResponseType,
    MessageFlags,
    type APIBaseInteraction,
    InteractionType,
} from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { Precondition } from '../structures/Precondition';

// Variables reset after ~30 sec and requests may end up with a different global state

// Cooldowns cannot exceed 30 seconds and are not very reliable

// However, they work find for this use case

const cooldown: Collection<string, RateLimitManager> = new Collection();

export class CooldownPrecondition extends Precondition {
    public constructor(env: ENV) {
        super({
            env: env,
            name: 'cooldown',
        });
    }

    public async chatInput(command: Command, interaction: APIChatInputApplicationCommandInteraction) {
        const rateLimitManager = cooldown.ensure(
            command.structure.name,
            () => new RateLimitManager(command.cooldown, command.cooldownLimit),
        );

        const rateLimit = rateLimitManager.acquire(
            (interaction.member?.user ?? interaction.user)!.id,
        );

        if (rateLimit.limited) {
            console.warn(
                `${this.constructor.name}:`,
                'User failed cooldown precondition.',
                `Command: ${command.structure.name}.`,
                `User: ${interaction.member?.user.id ?? interaction.user?.id}.`,
            );

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