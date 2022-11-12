import type { Env } from '../@types/Env';
import type { Modal } from '../structures/Modal';
// import { TestModal } from './test';

export const modals = {
    // test: TestModal,
} as {
    // test: new (env: Env) => TestModal,
    [key: string]: (new (env: Env) => Modal) | undefined,
};
