import {
    isChatInputApplicationCommandInteraction,
    isContextMenuApplicationCommandInteraction,
} from 'discord-api-types/utils/v10';
import { APIApplicationCommandInteraction } from 'discord-api-types/v10';
import { Command as CommandType } from '../@types/Command';
import { ENV } from '../@types/ENV';
import { APIResponse } from './APIResponse';
import { commands } from '../commands';

export class CommandHandler {
    public async handle(interaction: APIApplicationCommandInteraction, env: ENV) {
        const Command = commands[
            interaction.data.name as keyof typeof commands
        ] as (new () => CommandType) | undefined;

        if (Command) {
            const command = new Command();

            if (isChatInputApplicationCommandInteraction(interaction)) {
                return command.chatInput!(interaction, env);
            }

            if (isContextMenuApplicationCommandInteraction(interaction)) {
                return command.contextMenu!(interaction, env);
            }
        }

        return new APIResponse(null, {
            status: 400,
        });
    }
}