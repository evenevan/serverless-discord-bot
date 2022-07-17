import { type ENV } from '../@types/env';
import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import { type Command } from '../structures/Command';
import { TestCommand } from './test';

export const commands = {
    invite: InviteCommand,
    test: TestCommand,
    ping: PingCommand,
} as {
    invite: new (env: ENV) => InviteCommand,
    test: new (env: ENV) => TestCommand,
    ping: new (env: ENV) => PingCommand,
    [key: string]: (new (env: ENV) => Command) | undefined,
};