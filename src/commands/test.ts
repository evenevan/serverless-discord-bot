import {
    type APIChatInputApplicationCommandInteraction,
    type APIDMChannel,
    InteractionResponseType,
    MessageFlags,
    ComponentType,
    ButtonStyle,
    ApplicationCommandOptionType,
    type APIApplicationCommandAutocompleteInteraction,
    ApplicationCommandType,
    type APIUserApplicationCommandInteraction,
} from 'discord-api-types/v10';
import { type CustomID } from '../@types/customID';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { root } from '../utility/Constants';

export class TestCommand extends Command {
    public constructor(env: ENV) {
        super({
            name: 'test',
            description: 'TESTING',
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
                        description: 'fescription1',
                        options: [
                            {
                                type: ApplicationCommandOptionType.Subcommand,
                                name: 'subcommand',
                                description: 'fescription2',
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
        };
    }

    public async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        const response = await fetch(`${root}/users/@me/channels`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipient_id: (interaction.member?.user ?? interaction.user)!.id,
            }),
        });

        const channel = await response.json() as APIDMChannel;

        await fetch(`${root}/channels/${channel.id}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.env.DISCORD_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: i18n.getMessage(
                    'commandsTestChatInputSend',
                ),
            }),
        });

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsTestChatInputResponse',
                ),
                flags: MessageFlags.Ephemeral,
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: 'Test',
                                style: ButtonStyle.Primary,
                                custom_id: JSON.stringify({
                                    customID: 'test',
                                } as CustomID),
                            },
                        ],
                    },
                ],
            },
        });
    }

    public async contextMenu(interaction: APIUserApplicationCommandInteraction) {
        const { i18n } = interaction;

        const userId = Object.values(interaction.data.resolved.users)[0].id;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsTestContextResponse', [
                        userId,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }

    public async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: [
                    {
                        name: i18n.getMessage(
                            'commandsTestAutocompleteResponse', [
                                Date.now(),
                            ],
                        ),
                        value: Date.now().toString(),
                    },
                ],
            },
        });
    }
}