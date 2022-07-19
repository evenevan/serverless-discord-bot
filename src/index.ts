import {
    type APIApplicationCommandInteraction,
    type APIPingInteraction,
    InteractionResponseType,
    InteractionType,
    type APIInteraction,
    type APIMessageComponentInteraction,
    APIModalSubmitInteraction,
    APIApplicationCommandAutocompleteInteraction,
} from 'discord-api-types/v10';
import { ENV } from './@types/env';
import { i18n } from './locales/i18n';
import { APIResponse } from './structures/APIResponse';
import { AutocompleteHandler } from './structures/AutocompleteHandler';
import { CommandHandler } from './structures/CommandHandler';
import { ComponentHandler } from './structures/ComponentHandler';
import { Database } from './structures/Database';
import { ModalHandler } from './structures/ModalHandler';
import { verifyKey } from './utility/verify';

export default {
    fetch: async (request: Request, env: ENV, context: ExecutionContext) => {
        if (request.method === 'POST') {
            const isValidRequest = await verifyKey(request, env);

            if (!isValidRequest) {
                console.warn('Bad request signature.');

                return new Response(null, {
                    status: 401,
                });
            }

            const interaction = await request.json() as
                | APIInteraction
                | APIPingInteraction;

            if (interaction.type === InteractionType.Ping) {
                return new APIResponse({
                    type: InteractionResponseType.Pong,
                });
            }

            Object.defineProperty(
                interaction,
                'i18n',
                {
                    value: new i18n(interaction.locale),
                },
            );

            console.log(
                'Received interaction.',
                `Type: ${interaction.type}.`,
            );

            // Some weird logic (probably on Prisma's side) causes this to not run without the IIFE block
            context.waitUntil((async () => {
                try {
                    const userID = (interaction.member?.user.id ?? interaction.user?.id)!;

                    const user = await new Database(env).users.findUnique({
                        select: {
                            added: true,
                            interactions: true,
                        },
                        where: {
                            id: userID,
                        },
                    });

                    await new Database(env).users.upsert({
                        create: {
                            id: userID,
                            added: Date.now(),
                        },
                        update: {
                            interactions: user
                                ? user.interactions + 1
                                : 0,
                        },
                        where: {
                            id: userID,
                        },
                    });
                } catch (error) {
                    console.error((error as Error)?.stack);
                }
            })());

            switch (interaction.type) {
                case InteractionType.ApplicationCommandAutocomplete:
                    return new AutocompleteHandler(env).handle(
                        interaction as APIApplicationCommandAutocompleteInteraction,
                    );
                case InteractionType.ApplicationCommand:
                    return new CommandHandler(env).handle(
                        interaction as APIApplicationCommandInteraction,
                    );
                case InteractionType.MessageComponent:
                    return new ComponentHandler(env).handle(
                        interaction as APIMessageComponentInteraction,
                    );
                case InteractionType.ModalSubmit:
                    return new ModalHandler(env).handle(
                        interaction as APIModalSubmitInteraction,
                    );
                default:
                    console.warn(
                        'Unknown interaction type.',
                        `Type: ${(interaction as APIInteraction).type}.`,
                    );

                    return new Response(null, {
                        status: 400,
                    });
            }
        }

        console.warn('Method used is not POST.');

        return new Response(null, {
            status: 400,
        });
    },
};