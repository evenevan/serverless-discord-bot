import 'dotenv/config';
import * as commands from './commands';

(async () => {
    const token = process.env.DISCORD_TOKEN;
    const applicationId = process.env.DISCORD_APPLICATION_ID;

    const response = await fetch(
        `https://discord.com/api/v10/applications/${applicationId}/commands`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify(Object.values(commands)),
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