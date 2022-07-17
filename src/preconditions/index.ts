import { type ENV } from '../@types/env';
import { CooldownPrecondition } from './cooldown';
import { GuildOnlyPrecondition } from './guildOnly';
import { OwnerOnlyPrecondition } from './ownerOnly';

export const preconditions = {
    cooldown: CooldownPrecondition,
    guildOnly: GuildOnlyPrecondition,
    ownerOnly: OwnerOnlyPrecondition,
} as {
    cooldown: new (env: ENV) => CooldownPrecondition,
    guildOnly: new (env: ENV) => GuildOnlyPrecondition,
    ownerOnly: new (env: ENV) => OwnerOnlyPrecondition,
};