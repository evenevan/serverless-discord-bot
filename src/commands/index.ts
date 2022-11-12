import type { Env } from '../@types/Env';
import { ApplicationCommand } from './application';
import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import { SnowflakeCommand } from './snowflake';
import type { Command } from '../structures/Command';
// import { TestCommand } from './test';
import { UserCommand } from './user';

export const commands = {
    application: ApplicationCommand,
    invite: InviteCommand,
    ping: PingCommand,
    snowflake: SnowflakeCommand,
    // test: TestCommand,
    user: UserCommand,
} as {
    application: new (env: Env) => ApplicationCommand,
    invite: new (env: Env) => InviteCommand,
    ping: new (env: Env) => PingCommand,
    snowflake: new (env: Env) => SnowflakeCommand,
    // test: new (env: Env) => TestCommand,
    user: new (env: Env) => UserCommand,
    [key: string]: (new (env: Env) => Command) | undefined,
};
