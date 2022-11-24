import { deepmerge } from 'deepmerge-ts';
import type { APIInteractionResponse } from 'discord-api-types/v10';
import { defaultResponse } from '../utility/Constants';

export class APIResponse extends Response {
    public constructor(response?: APIInteractionResponse | null, init?: ResponseInit) {
        super(JSON.stringify(deepmerge(defaultResponse, response)), {
            ...init,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
