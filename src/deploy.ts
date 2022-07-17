import 'dotenv/config';
import { type RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { type ENV } from './@types/ENV';
import { commands } from './commands';

(async () => {
    const {
        DISCORD_APPLICATION_ID,
        DISCORD_TOKEN,
    } = process.env as unknown as ENV;

    const env = process.env as unknown as ENV;

    const commandInstances = Object.values(commands).map(
        (Command) => new Command!(env),
    );

    const globalCommands = commandInstances.filter(
        (command) => typeof command.guildIDs === 'undefined',
    ).map((command) => command.structure);

    const guildCommands = commandInstances.filter(
        (command) => Number(command.guildIDs?.length) > 0,
    );

    const guildCommandsMap = { } as {
        [key: string]: RESTPostAPIApplicationCommandsJSONBody[] | undefined
    };

    guildCommands.forEach((guildCommand) => {
        guildCommand.guildIDs?.forEach((guildID) => {
            guildCommandsMap[guildID] ??= [];

            guildCommandsMap[guildID]?.push(guildCommand.structure);
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