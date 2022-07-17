import { type ENV } from '../@types/env';
import { CooldownPrecondition } from '../../temp/cooldown';
import { Precondition } from '../structures/Precondition';
import { OwnerOnlyPrecondition } from '../../temp/ownerOnly';

export const preconditions = {
    cooldown: CooldownPrecondition as new (env: ENV) => Precondition,
    ownerOnly: OwnerOnlyPrecondition as new (env: ENV) => Precondition,
};