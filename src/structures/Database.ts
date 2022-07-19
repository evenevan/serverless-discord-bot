import { PrismaClient } from '@prisma/client/edge';
import { type ENV } from '../@types/ENV';

let client: PrismaClient | null = null;

export class Database extends PrismaClient {
    constructor(env: ENV) {
        console.log(env);
        if (client === null) {
            // Prisma is pulling a stupid and not setting this properly

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