import type { Env } from '../@types/temp';
import { CooldownPrecondition } from './cooldown';
import { GuildOnlyPrecondition } from './guildOnly';
import { OwnerOnlyPrecondition } from './ownerOnly';

export const preconditions = {
    cooldown: CooldownPrecondition,
    guildOnly: GuildOnlyPrecondition,
    ownerOnly: OwnerOnlyPrecondition,
} as {
    cooldown: new (env: Env) => CooldownPrecondition,
    guildOnly: new (env: Env) => GuildOnlyPrecondition,
    ownerOnly: new (env: Env) => OwnerOnlyPrecondition,
};
