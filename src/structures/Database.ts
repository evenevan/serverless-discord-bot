import { PrismaClient } from '@prisma/client/edge';
import type { Env } from '../@types/temp';

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
