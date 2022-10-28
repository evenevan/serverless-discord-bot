import type { Env } from '../@types/Env';
import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import type { Command } from '../structures/Command';
import { TestCommand } from './test';

export const commands = {
    invite: InviteCommand,
    test: TestCommand,
    ping: PingCommand,
} as {
    invite: new (env: Env) => InviteCommand,
    test: new (env: Env) => TestCommand,
    ping: new (env: Env) => PingCommand,
    [key: string]: (new (env: Env) => Command) | undefined,
};
