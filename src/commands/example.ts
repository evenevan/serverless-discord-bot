import { InteractionOptionResolver } from '@sapphire/discord-utilities';
import {
    type APIApplicationCommandAutocompleteInteraction,
    type APIApplicationCommandInteraction,
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    type APIDMChannel,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ButtonStyle,
    ComponentType,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { CustomId } from '../@types/temp';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { APIRoot } from '../utility/Constants';

export class ExampleCommand extends Command {
    public constructor(env: Env) {
        super({
            name: 'example',
            description: 'sends a button that creates a modal that creates a response',
            env: env,
            preconditions: ['cooldown', 'ownerOnly'],
            cooldown: 10000,
        });

        this.structure = {
            chatInput: {
                name: this.name,
                description: this.description,
                options: [
                    {
                        type: ApplicationCommandOptionType.SubcommandGroup,
                        name: 'subcommandgroup',
                        description: 'description1',
                        options: [
                            {
                                type: ApplicationCommandOptionType.Subcommand,
                                name: 'subcommand',
                                description: 'description2',
                                options: [
                                    {
                                        type: ApplicationCommandOptionType.String,
                                        name: 'string',
                                        description: 'description3',
                                        required: false,
                                        autocomplete: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
                type: ApplicationCommandType.ChatInput,
            },
            user: {
                name: this.name,
                type: ApplicationCommandType.User,
            },
            message: {
                name: this.name,
                type: ApplicationCommandType.Message,
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        const response = await fetch(`${APIRoot}/users/@me/channels`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipient_id: (interaction.member?.user ?? interaction.user)!.id,
            }),
        });

        const channel = (await response.json()) as APIDMChannel;

        await fetch(`${APIRoot}/channels/${channel.id}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: i18n.getMessage('commandsExampleChatInputSend'),
            }),
        });

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage('commandsExampleChatInputResponse'),
                flags: MessageFlags.Ephemeral,
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: i18n.getMessage(
                                    'commandsExampleChatInputResponseComponentsOneLabel',
                                ),
                                style: ButtonStyle.Primary,
                                custom_id: JSON.stringify({
                                    customID: 'example',
                                } as CustomId),
                            },
                        ],
                    },
                ],
            },
        });
    }

    public override async contextMenu(interaction: APIContextMenuInteraction) {
        const { i18n } = interaction;

        const options = new InteractionOptionResolver(
            // @ts-ignore i have no idea why this doesn't work
            interaction as APIApplicationCommandInteraction,
        );

        const userId = interaction.data.type === ApplicationCommandType.User
            ? options.getTargetUser().id
            : null;

        const messageId = interaction.data.type === ApplicationCommandType.Message
            ? options.getTargetMessage().id
            : null;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage('commandsExampleContextResponse', [
                    String(messageId),
                    String(userId),
                ]),
                flags: MessageFlags.Ephemeral,
            },
        });
    }

    public override async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: [
                    {
                        name: i18n.getMessage('commandsExampleAutocompleteResponse', [Date.now()]),
                        value: Date.now().toString(),
                    },
                ],
            },
        });
    }
}
