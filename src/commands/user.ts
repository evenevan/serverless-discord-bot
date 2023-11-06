import { InteractionOptionResolver } from '@sapphire/discord-utilities';
import {
    type APIChatInputApplicationCommandInteraction,
    type APIContextMenuInteraction,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    CDNRoutes,
    type DefaultUserAvatarAssets,
    ImageFormat,
    InteractionResponseType,
    MessageFlags,
    type APIUser,
} from 'discord-api-types/v10';
import type { Env } from '../@types/Env';
import { APIResponse } from '../structures/APIResponse';
import { Command } from '../structures/Command';
import { CDNRoot } from '../utility/Constants';

export class UserCommand extends Command {
    public constructor(env: Env) {
        super({
            name: 'user',
            description: 'Display user information',
            env: env,
            preconditions: ['cooldown'],
        });

        this.structure = {
            chatInput: {
                name: this.name,
                description: this.description,
                options: [
                    {
                        name: 'user',
                        description: 'The user',
                        type: ApplicationCommandOptionType.User,
                        required: true,
                    },
                ],
                type: ApplicationCommandType.ChatInput,
            },
            user: {
                name: this.name,
                type: ApplicationCommandType.User,
            },
        };
    }

    public override async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
        // @ts-ignore i have no idea why this doesn't work
        const options = new InteractionOptionResolver(interaction);

        const user = options.getUser('user', true);

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `${JSON.stringify(user, null, 2)}\n\n${this.getAvatar(user)}`,
                flags: MessageFlags.Ephemeral,
            },
        });
    }

    public override async contextMenu(interaction: APIContextMenuInteraction) {
        const options = new InteractionOptionResolver(
            // @ts-ignore i have no idea why this doesn't work
            interaction as APIApplicationCommandInteraction,
        );

        const user = options.getTargetUser();

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `${JSON.stringify(user, null, 2)}\n\n${this.getAvatar(user)}`,
                flags: MessageFlags.Ephemeral,
            },
        });
    }

    private getAvatar(user: APIUser) {
        const format = user.avatar?.startsWith('a_') ? ImageFormat.GIF : ImageFormat.PNG;

        const avatarRoute = user.avatar
            ? CDNRoutes.userAvatar(user.id, user.avatar, format)
            : CDNRoutes.defaultUserAvatar(
                (user.discriminator === '0')
                    // eslint-disable-next-line no-bitwise
                    ? ((Number(user.id) >> 22) % 6) as DefaultUserAvatarAssets
                    : (Number(user.discriminator) % 5) as DefaultUserAvatarAssets,
            );

        return `${CDNRoot}${avatarRoute}?size=4096`;
    }
}
