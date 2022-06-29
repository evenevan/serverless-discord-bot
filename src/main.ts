import { verifyKey } from 'discord-interactions';
import { handle } from './server';

export default {
    fetch: async (request: Request, env: { [key: string]: string }) => {
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

            return handle(request, env);
        }

        return new Response('', { status: 400 });
    },
};