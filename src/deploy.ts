import 'dotenv/config';
import { commands } from './commands/map';

(async () => {
    const token = process.env.DISCORD_TOKEN;
    const applicationId = process.env.DISCORD_APPLICATION_ID;

    const structures = Object.values(commands).map((Command) => new Command().structure);

    console.log(JSON.stringify(structures, undefined, 2));

    const response = await fetch(
        `https://discord.com/api/v10/applications/${applicationId}/commands`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify(structures),
        },
    );

    if (response.ok) {
        console.log('Registered all commands');
    } else {
        console.error('Error registering commands');
        const text = await response.text();
        console.error(text);
    }

    return response;
})();