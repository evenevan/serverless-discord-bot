import { Command } from '../@types/Command';
import { InviteCommand } from './invite';
import { TestCommand } from './test';

export const commands = {
    invite: InviteCommand,
    test: TestCommand,
} as {
    [key: string]: new () => Command
};