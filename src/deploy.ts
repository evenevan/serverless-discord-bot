import 'dotenv/config';
import type {
    InteractionType,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import type { EnvDeploy } from './@types/Env';
import { commands } from './commands';
import type { i18n } from './locales/i18n';

(async () => {
    const {
        DISCORD_APPLICATION_ID,
        DISCORD_TOKEN,
    } = process.env as unknown as EnvDeploy;

    const env = process.env as unknown as EnvDeploy;

    const commandInstances = Object.values(commands).map(
        (Command) => new Command!(env),
    );

    const globalCommands = commandInstances.filter(
        (command) => typeof command.guildIDs === 'undefined',
    ).map((command) => Object.values(command.structure)).flat(1);

    const guildCommands = commandInstances.filter(
        (command) => Number(command.guildIDs?.length) > 0,
    );

    const guildCommandsMap = {} as {
        [key: string]: RESTPostAPIApplicationCommandsJSONBody[] | undefined
    };

    guildCommands.forEach((guildCommand) => {
        guildCommand.guildIDs?.forEach((guildID) => {
            guildCommandsMap[guildID] ??= [];

            guildCommandsMap[guildID]?.push(
                ...Object.values(guildCommand.structure),
            );
        });
    });

    await Promise.all(
        Object.entries(guildCommandsMap).map(async ([guildID, guildGuildCommands]) => {
            const guildResponse = await fetch(
                `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/guilds/${guildID}/commands`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${DISCORD_TOKEN}`,
                    },
                    method: 'PUT',
                    body: JSON.stringify(guildGuildCommands),
                },
            );

            if (guildResponse.ok) {
                console.log(`Registered guild commands for ${guildID}`);
            } else {
                console.error(`Error registering global commands for ${guildID}`);
                const text = await guildResponse.text();
                console.error(text);
            }
        }),
    );

    const globalResponse = await fetch(
        `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${DISCORD_TOKEN}`,
            },
            method: 'PUT',
            body: JSON.stringify(globalCommands),
        },
    );

    if (globalResponse.ok) {
        console.log('Registered global commands');
    } else {
        console.error('Error registering global commands');
        const text = await globalResponse.text();
        console.error(text);
    }
})();

declare module 'discord-api-types/v10' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface APIBaseInteraction<Type extends InteractionType, Data> {
        i18n: i18n;
    }
}
