import { type ENV } from '../@types/env';
import { type Modal } from '../structures/Modal';
import { TestModal } from './test';

export const modals = {
    test: TestModal,
} as {
    [key: string]: (new (env: ENV) => Modal) | undefined,
};