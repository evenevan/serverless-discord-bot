import { type APIMessageComponentInteraction } from 'discord-api-types/v10';
import { type ENV } from '../@types/env';
import { type Component } from '../structures/Component';
import { TestComponent } from './test';

export const components = {
    test: TestComponent,
} as {
    [key: string]:
    | (new (env: ENV) => Component<APIMessageComponentInteraction>)
    | undefined,
};