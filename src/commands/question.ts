import { InteractionOptionResolver } from '@sapphire/discord-utilities';
import {
    type APIChatInputApplicationCommandInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    InteractionResponseType,
    MessageFlags,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';

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
                        name: 'question',
                        description: 'The stupid question',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'user',
                        description: 'The asker of the stupid question',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        const { i18n } = interaction;

        // @ts-ignore i have no idea why this doesn't work
        const options = new InteractionOptionResolver(interaction);

        const question = options.getString('question', true);
        const user = options.getString('user', true);

        this.env.QUESTIONS.put(String(Date.now()), `User: ${user} Question: ${question}`);

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: i18n.getMessage(
                    'commandsQuestionChatInputSend', [
                        question,
                        user,
                    ],
                ),
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
