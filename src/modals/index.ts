import { type ENV } from '../@types/env';
import { type Modal } from '../structures/Modal';
import { TestModal } from './test';

export const modals = {
    test: TestModal,
} as {
    test: new (env: ENV) => TestModal,
    [key: string]: (new (env: ENV) => Modal) | undefined,
};