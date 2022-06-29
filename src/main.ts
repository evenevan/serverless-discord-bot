import {
    APIApplicationCommandInteraction,
    APIPingInteraction,
    InteractionResponseType,
    InteractionType,
} from 'discord-api-types/v10';
import { verifyKey } from 'discord-interactions';
import { ENV } from './@types/ENV';
import { CommandHandler } from './structures/CommandHandler';

export default {
    fetch: async (request: Request, env: ENV) => {
        if (request.method === 'POST') {
            const signature = request.headers.get('x-signature-ed25519');
            const timestamp = request.headers.get('x-signature-timestamp');

            const body = await request.clone().arrayBuffer();

            const isValidRequest = verifyKey(
                body,
                signature!,
                timestamp!,
                env.DISCORD_PUBLIC_KEY,
            );

            if (!isValidRequest) {
                return new Response('Bad request signature.', { status: 401 });
            }

            console.log(env);

            const interaction = await request.json() as
                | APIApplicationCommandInteraction
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

            return new CommandHandler().handle(interaction, env);
        }

        return new Response('', { status: 400 });
    },
};