import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

export class Command {
    readonly structure: RESTPostAPIApplicationCommandsJSONBody;

    constructor(structure: RESTPostAPIApplicationCommandsJSONBody) {
        this.structure = structure;
    }
}