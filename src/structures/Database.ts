import { PrismaClient } from '@prisma/client/edge';
import type { Env } from '../@types/Env';

let client: PrismaClient | null = null;

export class Database extends PrismaClient {
    constructor(env: Env) {
        if (client === null) {
            super({
                datasources: {
                    db: {
                        url: env.DATABASE_URL,
                    },
                },
            });

            client = this;
        }

        // eslint-disable-next-line no-constructor-return
        return client;
    }
}

// context.waitUntil(
//     (async () => {
//         try {
//             const userId = (interaction.member?.user.id ?? interaction.user?.id)!;

//             await new Database(env).users.upsert({
//                 create: {
//                     id: userId,
//                 },
//                 update: {
//                     interactions: {
//                         increment: 1,
//                     },
//                 },
//                 where: {
//                     id: userId,
//                 },
//             });

//             await new Database(env).interactions.create({
//                 data: {
//                     id: interaction.id,
//                     user_id: userId,
//                     type: interaction.type,
//                     guild_id: interaction.guild_id,
//                     name: 'name' in interaction.data ? interaction.data.name : null,
//                     options:
//                         'options' in interaction.data
//                             ? JSON.parse(JSON.stringify(interaction.data.options ?? []))
//                             : [],
//                     custom_id:
//                         'custom_id' in interaction.data
//                             ? interaction.data.custom_id
//                             : null,
//                 },
//             });
//         } catch (error) {
//             console.error((error as Error)?.stack);
//         }
//     })(),
// );
