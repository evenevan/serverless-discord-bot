import type { APIMessageComponentInteraction } from 'discord-api-types/v10';
import type { CustomId } from '../@types/CustomId';
import type { Env } from '../@types/Env';
import { APIResponse } from './APIResponse';
import { components } from '../components';

export class ComponentHandler {
    public readonly env: Env;

    public constructor(env: Env) {
        this.env = env;
    }

    public handle(interaction: APIMessageComponentInteraction) {
        const { customID } = JSON.parse(interaction.data.custom_id) as CustomId;
        const Component = components[customID];

        if (Component) {
            return new Component(this.env).respond(interaction);
        }

        console.warn(
            `${this.constructor.name}:`,
            'Received component custom ID was not found in export.',
            `Custom ID: ${interaction.data.custom_id}.`,
        );

        return new APIResponse(null, {
            status: 400,
        });
    }
}
