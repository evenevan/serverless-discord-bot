import { PrismaClient } from '@prisma/client/edge';
import { type ENV } from '../@types/ENV';

let client: PrismaClient | null = null;

export class Database extends PrismaClient {
    constructor(env: ENV) {
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