import { Collection } from '@discordjs/collection';
import {
    RateLimit,
    RateLimitManager,
} from '@sapphire/ratelimits';
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

// Variables reset after ~30 sec and requests may end up with a different global state

// Cooldowns cannot exceed 30 seconds and are not very reliable

// However, they work fine for this use case

const cooldown: Collection<string, RateLimitManager> = new Collection();

export class CooldownPrecondition extends Precondition {
    public constructor(env: Env) {
        super({
            env: env,
            name: 'cooldown',
        });
    }

    public override async chatInput(command: Command, interaction: APIChatInputApplicationCommandInteraction) {
        return this.cooldown(command, interaction);
    }

    public override async contextMenu(command: Command, interaction: APIContextMenuInteraction) {
        return this.cooldown(command, interaction);
    }

    public async cooldown(command: Command, interaction: APIApplicationCommandInteraction) {
        const rateLimitManager = cooldown.ensure(
            command.name,
            () => new RateLimitManager(command.cooldown, command.cooldownLimit),
        );

        const rateLimit = rateLimitManager.acquire(
            (interaction.member?.user ?? interaction.user)!.id,
        );

        if (rateLimit.limited) {
            console.warn(
                `${this.constructor.name}:`,
                'User failed cooldown precondition.',
                `Command: ${command.name}.`,
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
                    'preconditionsCooldown',
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
