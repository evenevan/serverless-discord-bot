import type { APIMessageComponentInteraction } from 'discord-api-types/v10';
import type { Env } from '../@types/temp';
import type { Component } from '../structures/Component';
import { TestComponent } from './test';

export const components = {
    test: TestComponent,
} as {
    test: new (env: Env) => TestComponent,
    [key: string]: (new (env: Env) => Component<APIMessageComponentInteraction>) | undefined,
};
