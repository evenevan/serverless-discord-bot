import { type APIModalSubmitInteraction } from 'discord-api-types/v10';
import { type CustomID } from '../@types/customID';
import { type ENV } from '../@types/env';
import { APIResponse } from './APIResponse';
import { modals } from '../modals';

export class ModalHandler {
    public readonly env: ENV;

    public constructor(env: ENV) {
        this.env = env;
    }

    public handle(interaction: APIModalSubmitInteraction) {
        const { customID } = JSON.parse(interaction.data.custom_id) as CustomID;
        const Modal = modals[customID];

        if (Modal) {
            return new Modal(this.env).respond(interaction);
        }

        console.warn(
            `${this.constructor.name}:`,
            'Received modal custom ID was not found in export.',
            `Custom ID: ${interaction.data.custom_id}.`,
        );

        return new APIResponse(null, {
            status: 400,
        });
    }
}