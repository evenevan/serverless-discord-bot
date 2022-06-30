import { Command } from '../@types/Command';
import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import { TestCommand } from './test';

export const commands = {
    invite: InviteCommand,
    test: TestCommand,
    ping: PingCommand,
} as {
    [key: string]: new () => Command
};