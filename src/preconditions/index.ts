import { type ENV } from '../@types/env';
import { CooldownPrecondition } from './cooldown';
import { OwnerOnlyPrecondition } from './ownerOnly';
import { Precondition } from '../structures/Precondition';

export const preconditions = {
    cooldown: CooldownPrecondition as new (env: ENV) => Precondition,
    ownerOnly: OwnerOnlyPrecondition as new (env: ENV) => Precondition,
};