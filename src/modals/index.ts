import type { Env } from '../@types/Env';
import type { Modal } from '../structures/Modal';
import { ExampleModal } from './example';

export const modals = {
    example: ExampleModal,
} as {
    example: new (env: Env) => ExampleModal;
    [key: string]: (new (env: Env) => Modal) | undefined;
};
