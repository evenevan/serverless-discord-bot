import { InteractionOptionResolver } from '@sapphire/discord-utilities';
import {
    type APIApplication,
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { APIRoot } from '../utility/Constants';

export class ApplicationCommand extends Command {
    public constructor(env: Env) {
        super({
            name: 'application',
            description: 'Display application information',
            env: env,
            preconditions: ['cooldown'],
        });

        this.structure = {
            chatInput: {
                name: this.name,
                description: this.description,
                options: [
                    {
                        name: 'id',
                        description: 'The application Id',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
                type: ApplicationCommandType.ChatInput,
            },
            user: {
                name: this.name,
                type: ApplicationCommandType.User,
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        // @ts-ignore i have no idea why this doesn't work
        const options = new InteractionOptionResolver(interaction);

        const applicationId = options.getString('id', true);

        const response = await fetch(`${APIRoot}/applications/${applicationId}/rpc`, {
            method: 'GET',
        });

        const application = await response.json() as APIApplication;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: JSON.stringify(application, null, 2),
                flags: MessageFlags.Ephemeral,
            },
        });
    }

    public override async contextMenu(interaction: APIContextMenuInteraction) {
        // @ts-ignore i have no idea why this doesn't work
        const options = new InteractionOptionResolver(interaction as APIApplicationCommandInteraction);

        const { id } = options.getTargetUser();

        const response = await fetch(`${APIRoot}/applications/${id}/rpc`, {
            method: 'GET',
        });

        const application = await response.json() as APIApplication;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: JSON.stringify(application, null, 2),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
