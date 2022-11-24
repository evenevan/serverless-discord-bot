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

        const format = user.avatar?.startsWith('a_') ? ImageFormat.GIF : ImageFormat.PNG;

        const avatarRoute = user.avatar
            ? CDNRoutes.userAvatar(user.id, user.avatar, format)
            : CDNRoutes.defaultUserAvatar(
                (Number(user.discriminator) % 5) as DefaultUserAvatarAssets,
            );

        const avatarURL = `${CDNRoot}/${avatarRoute}?size=4096`;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `${JSON.stringify(user, null, 2)}\n\n${avatarURL}`,
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

        const format = user.avatar?.startsWith('a_') ? ImageFormat.GIF : ImageFormat.PNG;

        const avatarRoute = user.avatar
            ? CDNRoutes.userAvatar(user.id, user.avatar, format)
            : CDNRoutes.defaultUserAvatar(
                (Number(user.discriminator) % 5) as DefaultUserAvatarAssets,
            );

        const avatarURL = `${CDNRoot}/${avatarRoute}?size=4096`;

        return new APIResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `${JSON.stringify(user, null, 2)}\n\n${avatarURL}`,
                flags: MessageFlags.Ephemeral,
            },
        });
    }
}
