import { InteractionOptionResolver } from '@sapphire/discord-utilities';
import {
    type APIApplicationCommandAutocompleteInteraction,
    type APIApplicationCommandInteractionDataStringOption,
    type APIChatInputApplicationCommandInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ComponentType,
    InteractionResponseType,
    TextInputStyle,
} from 'discord-api-types/v10';
import type { CustomId } from '../@types/CustomId';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { stupidQuestionAskers } from '../utility/Constants';

export class QuestionCommand extends Command {
    public constructor(env: Env) {
        super({
            name: 'question',
            description: 'I hate your stupid questions',
            env: env,
            preconditions: ['cooldown'],
        });

        this.structure = {
            chatInput: {
                name: this.name,
                description: this.description,
                type: ApplicationCommandType.ChatInput,
                options: [
                    {
                        name: 'user',
                        description: 'The asker of the stupid question',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        autocomplete: true,
                    },
                ],
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        // @ts-ignore i have no idea why this doesn't work
        const options = new InteractionOptionResolver(interaction);
        const user = options.getString('user', true);

        return new APIResponse({
            type: InteractionResponseType.Modal,
            data: {
                custom_id: JSON.stringify({
                    customID: 'question',
                    user: user,
                } as CustomId),
                title: i18n.getMessage('commandsQuestionChatInputModalTitle', [user]),
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.TextInput,
                                custom_id: JSON.stringify({
                                    customID: 'input',
                                } as CustomId),
                                style: TextInputStyle.Paragraph,
                                label: i18n.getMessage('commandsQuestionChatInputModalLabel'),
                                required: true,
                            },
                        ],
                    },
                ],
            },
        });
    }

    public override async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
        const focused = interaction.data.options.find(
            (option) => 'focused' in option && option.focused === true,
        ) as APIApplicationCommandInteractionDataStringOption | undefined;

        const lowerValue = focused?.value?.toLowerCase() as string;

        const choices = focused?.value
            ? stupidQuestionAskers.filter((stupidQuestionAsker) => {
                const lowerAsker = stupidQuestionAsker.toLowerCase();
                return lowerAsker.startsWith(lowerValue);
            })
            : stupidQuestionAskers;

        if (choices.length === 0 && focused) {
            choices.push(focused.value);
        }

        return new APIResponse({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: choices.map((stupidQuestionAsker) => ({
                    name: stupidQuestionAsker,
                    value: stupidQuestionAsker,
                })),
            },
        });
    }
}
