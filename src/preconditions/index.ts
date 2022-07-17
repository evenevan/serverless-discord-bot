import { type ENV } from '../@types/env';
import { CooldownPrecondition } from './Cooldown';
import { Precondition } from '../structures/Precondition';
import { OwnerOnlyPrecondition } from './OwnerOnly';

export const preconditions = {
    cooldown: CooldownPrecondition as new (env: ENV) => Precondition,
    ownerOnly: OwnerOnlyPrecondition as new (env: ENV) => Precondition,
};