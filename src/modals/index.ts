import type { Env } from '../@types/Env';
import type { Modal } from '../structures/Modal';
import { ExampleModal } from './example';
import { QuestionModal } from './question';

export const modals = {
    example: ExampleModal,
    question: QuestionModal,
} as {
    example: new (env: Env) => ExampleModal;
    question: new (env: Env) => QuestionModal;
    [key: string]: (new (env: Env) => Modal) | undefined;
};
