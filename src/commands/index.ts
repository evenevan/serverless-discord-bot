import type { Env } from '../@types/Env';
import { ApplicationCommand } from './application';
import { InviteCommand } from './invite';
import { PingCommand } from './ping';
import { SnowflakeCommand } from './snowflake';
import type { Command } from '../structures/Command';
import { UserCommand } from './user';
import { QuestionCommand } from './question';
import { ExampleCommand } from './example';

export const commands = {
    application: ApplicationCommand,
    example: ExampleCommand,
    invite: InviteCommand,
    ping: PingCommand,
    question: QuestionCommand,
    snowflake: SnowflakeCommand,
    user: UserCommand,
} as {
    application: new (env: Env) => ApplicationCommand,
    example: new (env: Env) => ExampleCommand,
    invite: new (env: Env) => InviteCommand,
    ping: new (env: Env) => PingCommand,
    snowflake: new (env: Env) => SnowflakeCommand,
    question: new (env: Env) => QuestionCommand,
    user: new (env: Env) => UserCommand,
    [key: string]: (new (env: Env) => Command) | undefined,
};
