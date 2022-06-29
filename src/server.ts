import {
    APIApplicationCommand,
    APIPingInteraction,
    InteractionResponseType,
    InteractionType,
} from 'discord-api-types/v10';
import { InteractionResponseFlags } from 'discord-interactions';

const root = 'https://discord.com/api/v10/';

export async function handle(request: Request, env: { [key: string]: string }) {
    const interaction = await request.json() as APIApplicationCommand | APIPingInteraction;

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

    const message = await fetch(`${root}/channels/621774933252374592/messages`, {
        method: 'post',
        headers: {
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: 'hi',
        }),
    });

    console.log(JSON.stringify(await message.json(), undefined, 2));

    return new Response(
        JSON.stringify({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: 'hi',
                flags: InteractionResponseFlags.EPHEMERAL,
            },
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
}