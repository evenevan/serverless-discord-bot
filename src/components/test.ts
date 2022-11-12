import {
    type APIMessageComponentButtonInteraction,
    ComponentType,
    InteractionResponseType,
    TextInputStyle,
} from 'discord-api-types/v10';
import type { CustomId } from '../@types/CustomId';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Component } from '../structures/Component';

export class TestComponent extends Component<APIMessageComponentButtonInteraction> {
    public constructor(env: Env) {
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
                } as CustomId),
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
                                } as CustomId),
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
                                } as CustomId),
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
