import { APIMessageComponentInteraction } from 'discord-api-types/v10';
import { ENV } from '../@types/ENV';
import { components } from '../components';
import { APIResponse } from './APIResponse';

export class ComponentHandler {
    public handle(interaction: APIMessageComponentInteraction, env: ENV) {
        const Component = components[interaction.data.custom_id];

        if (Component) {
            return new Component(env).respond(interaction);
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