import {
    type APIApplicationCommandInteraction,
    APIPingInteraction,
    InteractionResponseType,
    InteractionType,
    APIInteraction,
    APIMessageComponentInteraction,
} from 'discord-api-types/v10';
import { ENV } from './@types/env';
import { i18n } from './locales/i18n';
import { CommandHandler } from './structures/CommandHandler';
import { ComponentHandler } from './structures/ComponentHandler';
import { verifyKey } from './utility/verify';

export default {
    fetch: async (request: Request, env: ENV) => {
        if (request.method === 'POST') {
            const isValidRequest = await verifyKey(request, env);

            if (!isValidRequest) {
                console.warn('Bad request signature.');

                return new Response(
                    'Bad request signature.', {
                        status: 401,
                    },
                );
            }

            const interaction = await request.json() as
                | APIInteraction
                | APIPingInteraction;

            if (interaction.type === InteractionType.Ping) {
                return new Response(
                    JSON.stringify({
                        type: InteractionResponseType.Pong,
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
            }

            Object.defineProperty(
                interaction,
                'i18n',
                {
                    value: new i18n(interaction.locale),
                },
            );

            if (interaction.type === InteractionType.ApplicationCommand) {
                return new CommandHandler(env).handle(
                    interaction as APIApplicationCommandInteraction,
                );
            }

            if (interaction.type === InteractionType.MessageComponent) {
                return new ComponentHandler(env).handle(
                    interaction as APIMessageComponentInteraction,
                );
            }
        }

        console.warn('Method used is not POST.');

        return new Response(null, { status: 400 });
    },
};

declare module 'discord-api-types/v10' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface APIBaseInteraction<Type extends InteractionType, Data> {
        i18n: i18n;
    }
}