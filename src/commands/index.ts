import type { Env } from '../@types/Env';
import { ApplicationCommand } from './application';
import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import { SnowflakeCommand } from './snowflake';
import type { Command } from '../structures/Command';
import { UserCommand } from './user';
import { ExampleCommand } from './example';

export const commands = {
    application: ApplicationCommand,
    example: ExampleCommand,
    invite: InviteCommand,
    ping: PingCommand,
    snowflake: SnowflakeCommand,
    user: UserCommand,
} as {
    application: new (env: Env) => ApplicationCommand,
    example: new (env: Env) => ExampleCommand,
    invite: new (env: Env) => InviteCommand,
    ping: new (env: Env) => PingCommand,
    snowflake: new (env: Env) => SnowflakeCommand,
    user: new (env: Env) => UserCommand,
    [key: string]: (new (env: Env) => Command) | undefined,
};
