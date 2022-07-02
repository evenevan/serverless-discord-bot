import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import { Command } from '../structures/Command';
import { TestCommand } from './test';

export const commands = {
    invite: InviteCommand,
    test: TestCommand,
    ping: PingCommand,
} as {
    [key: string]: new () => Command
};