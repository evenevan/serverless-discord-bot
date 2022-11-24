import type { APIMessageComponentInteraction } from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import type { Component } from '../structures/Component';
import { ExampleComponent } from './example';

export const components = {
    example: ExampleComponent,
} as {
    example: new (env: Env) => ExampleComponent;
    [key: string]: (new (env: Env) => Component<APIMessageComponentInteraction>) | undefined;
};
