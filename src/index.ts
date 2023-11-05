import {
    type APIApplicationCommandAutocompleteInteraction,
    type APIApplicationCommandInteraction,
    type APIInteraction,
    type APIMessageComponentInteraction,
    type APIModalSubmitInteraction,
    type APIPingInteraction,
    InteractionResponseType,
    InteractionType,
} from 'discord-api-types/v10';
import type { Env } from './@types/Env';
import { i18n } from './locales/i18n';
import { APIResponse } from './structures/APIResponse';
import { AutocompleteHandler } from './structures/AutocompleteHandler';
import { CommandHandler } from './structures/CommandHandler';
import { ComponentHandler } from './structures/ComponentHandler';
import { ModalHandler } from './structures/ModalHandler';
import { verifyKey } from './utility/verify';

export default {
    fetch: async (request: Request, env: Env) => {
        if (request.method !== 'POST') {
            console.warn('Method is not POST.');

            return new Response(null, {
                status: 400,
            });
        }

        const isValidRequest = await verifyKey(request, env);

        if (!isValidRequest) {
            console.warn('Bad request signature.');

            return new Response(null, {
                status: 401,
            });
        }

        const interaction = (await request.json()) as APIInteraction | APIPingInteraction;

        if (interaction.type === InteractionType.Ping) {
            return new APIResponse({
                type: InteractionResponseType.Pong,
            });
        }

        Object.defineProperty(interaction, 'i18n', {
            value: new i18n(interaction.locale),
        });

        console.log('Received interaction.', `Type: ${interaction.type}.`);

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
                return new ModalHandler(env).handle(interaction as APIModalSubmitInteraction);
            default:
                console.warn(
                    'Unknown interaction type.',
                    `Type: ${(interaction as APIInteraction).type}.`,
                );

                return new Response(null, {
                    status: 400,
                });
        }
    },
};
