import { type ENV } from '../@types/ENV';
import { CooldownPrecondition } from './Cooldown';
import { Precondition } from '../structures/Precondition';
import { OwnerOnlyPrecondition } from './OwnerOnly';

export const preconditions = {
    cooldown: CooldownPrecondition,
    ownerOnly: OwnerOnlyPrecondition,
} as {
    cooldown: new (env: ENV) => Precondition,
    ownerOnly: new (env: ENV) => Precondition,
};