import {
    isChatInputApplicationCommandInteraction,
    isContextMenuApplicationCommandInteraction,
} from 'discord-api-types/utils/v10';
import { APIApplicationCommandInteraction } from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';
import { commands } from '../commands';
import { Command as CommandType } from './Command';

export class CommandHandler {
    public async handle(interaction: APIApplicationCommandInteraction, env: ENV) {
        const Command = commands[
            interaction.data.name
        ] as (new (env: ENV) => CommandType) | undefined;

        if (Command) {
            const command = new Command(env);

            if (isChatInputApplicationCommandInteraction(interaction)) {
                return command.chatInput!(interaction);
            }

            if (isContextMenuApplicationCommandInteraction(interaction)) {
                return command.contextMenu!(interaction);
            }
        }

        return new APIResponse(null, {
            status: 400,
        });
    }
}