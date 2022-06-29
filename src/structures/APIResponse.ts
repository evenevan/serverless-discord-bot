import { APIInteractionResponse } from 'discord-api-types/v10';

export class APIResponse extends Response {
    constructor(response?: APIInteractionResponse | null, init?: ResponseInit) {
        super(
            JSON.stringify(response), {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }
}