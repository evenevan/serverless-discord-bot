import {
    isChatInputApplicationCommandInteraction,
    isContextMenuApplicationCommandInteraction,
} from 'discord-api-types/utils/v10';
import type { APIApplicationCommandInteraction } from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from './APIResponse';
import { commands } from '../commands';
import { preconditions } from '../preconditions';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

export class CommandHandler {
    public readonly env: Env;

    public constructor(env: Env) {
        this.env = env;
    }

    public async handle(interaction: APIApplicationCommandInteraction) {
        const Command = commands[
            interaction.data.name
        ];

        if (Command) {
            const command = new Command(this.env);

            const preconditons = command.preconditions.map(
                (precondition) => new preconditions[precondition](this.env),
            );

            if (isChatInputApplicationCommandInteraction(interaction)) {
                for (const precondition of preconditons) {
                    const value = await precondition.chatInput!(command, interaction);

                    if (value instanceof APIResponse) {
                        return value;
                    }
                }

                return command.chatInput!(interaction);
            }

            if (isContextMenuApplicationCommandInteraction(interaction)) {
                for (const precondition of preconditons) {
                    const value = await precondition.contextMenu!(command, interaction);

                    if (value instanceof APIResponse) {
                        return value;
                    }
                }

                return command.contextMenu!(interaction);
            }
        }

        console.warn(
            `${this.constructor.name}:`,
            'Received command was not found in export.',
            `Command: ${interaction.data.name}.`,
        );

        return new APIResponse(null, {
            status: 400,
        });
    }
}
