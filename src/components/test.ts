import {
    ComponentType,
    InteractionResponseType,
    TextInputStyle,
    type APIMessageComponentButtonInteraction,
} from 'discord-api-types/v10';
import { type CustomID } from '../@types/customID';
import { type ENV } from '../@types/env';
import { APIResponse } from '../structures/APIResponse';
import { Component } from '../structures/Component';

export class TestComponent extends Component<APIMessageComponentButtonInteraction> {
    public constructor(env: ENV) {
        super({
            env: env,
            customID: 'test',
        });
    }

    public async respond(interaction: APIMessageComponentButtonInteraction) {
        const { i18n } = interaction;

        return new APIResponse({
            type: InteractionResponseType.Modal,
            data: {
                custom_id: JSON.stringify({
                    customID: 'test',
                } as CustomID),
                title: i18n.getMessage(
                    'componentsTestResponseTitle',
                ),
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.TextInput,
                                custom_id: JSON.stringify({
                                    customID: 'input1',
                                } as CustomID),
                                style: TextInputStyle.Short,
                                label: i18n.getMessage(
                                    'componentsTestResponseComponentsZeroLabel',
                                ),
                            },
                        ],
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.TextInput,
                                custom_id: JSON.stringify({
                                    customID: 'input2',
                                } as CustomID),
                                style: TextInputStyle.Paragraph,
                                label: i18n.getMessage(
                                    'componentsTestResponseComponentsOneLabel',
                                ),
                                required: false,
                            },
                        ],
                    },
                ],
            },
        });
    }
}