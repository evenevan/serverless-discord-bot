import {
    isChatInputApplicationCommandInteraction,
    isContextMenuApplicationCommandInteraction,
} from 'discord-api-types/utils/v10';
import { type APIApplicationCommandInteraction } from 'discord-api-types/v10';
import { type ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';
import { commands } from '../commands';
import { type Command as CommandType } from './Command';
import { preconditions } from '../preconditions';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

export class CommandHandler {
    public async handle(interaction: APIApplicationCommandInteraction, env: ENV) {
        const Command = commands[
            interaction.data.name
        ] as (new (env: ENV) => CommandType) | undefined;

        if (Command) {
            const command = new Command(env);

            const preconditons = command.preconditions.map(
                (precondition) => new preconditions[precondition](env),
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