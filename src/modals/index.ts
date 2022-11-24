import type { Env } from '../@types/Env';
import type { Modal } from '../structures/Modal';
import { QuestionModal } from './question';
// import { TestModal } from './test';

export const modals = {
    question: QuestionModal,
    // test: TestModal,
} as {
    question: new (env: Env) => QuestionModal,
    // test: new (env: Env) => TestModal,
    [key: string]: (new (env: Env) => Modal) | undefined,
};
