import {
  CommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandStringOption,
} from 'discord.js';

export interface CommandInterface {
  readonly disabled?: boolean;
  readonly permissions?: PermissionResolvable[];
  readonly onlyDev?: boolean;
  readonly builder:
    | SlashCommandBuilder
    | SlashCommandStringOption
    | SlashCommandOptionsOnlyBuilder;
  readonly func: (interaction: CommandInteraction) => any;
  readonly displayModal?: () => any;
}
