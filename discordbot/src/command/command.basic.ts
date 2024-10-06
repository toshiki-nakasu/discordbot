import {
  CommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { CommandInterface } from './command.interface';

export class CommandBasic implements CommandInterface {
  readonly disabled?: boolean;
  readonly permissions?: PermissionResolvable[];
  readonly onlyDev?: boolean;
  readonly builder:
    | SlashCommandBuilder
    | SlashCommandStringOption
    | SlashCommandOptionsOnlyBuilder;
  readonly func: (interaction: CommandInteraction) => any;
  readonly displayModal?: () => any;

  constructor(options: NonNullable<CommandBasic>) {
    Object.assign(this, options);
  }
}
