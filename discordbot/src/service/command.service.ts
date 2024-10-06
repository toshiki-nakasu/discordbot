import {
  Client,
  Collection,
  Events,
  Interaction,
  REST,
  Routes,
} from 'discord.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { discord } from '../../config.json';
import { Logger } from '@nestjs/common';
import { CommandInterface } from 'src/command/command.interface';

export class CommandService {
  public build(client: Client<boolean>): Array<any> {
    const retCommands: Array<any> = [];
    const clientCommands: Collection<string, CommandInterface> =
      new Collection();

    const foldersPath: string = path.join(__dirname, '../', 'command/commands');
    const commandFiles: Array<string> = fs
      .readdirSync(foldersPath)
      .filter((file) => file.endsWith('.js'));

    let command: CommandInterface;
    for (const file of commandFiles) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      command = require(path.join(foldersPath, file)).default;
      if (command.disabled) continue;

      retCommands.push(command.builder.toJSON());
      clientCommands.set(command.builder.name, command);
    }

    client.commands = clientCommands;
    return retCommands;
  }

  public async register(restClient: REST, commands: Array<any>): Promise<void> {
    try {
      Logger.log(
        `Started refreshing ${commands.length} application (/) commands`,
        'CommandService.register',
      );

      await restClient.put(
        Routes.applicationGuildCommands(
          discord.bot.client_id,
          discord.guild_id,
        ),
        { body: commands },
      );
    } catch (error) {
      throw error;
    }

    Logger.log(
      'complete register application (/) commands',
      'CommandService.register',
    );
  }

  public asyncInteraction(client: Client) {
    const logStrObj: Map<string, any> = new Map();
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      logStrObj.clear();
      logStrObj.set('type', interaction.type);
      logStrObj.set('userId', interaction.user.id);
      Logger.log(
        JSON.stringify(Object.fromEntries(logStrObj)),
        'InteractionCalled',
      );

      if (!interaction.isChatInputCommand()) return;
      const command: CommandInterface = interaction.client.commands.get(
        interaction.commandName,
      ) as CommandInterface;

      if (!command) {
        Logger.error(
          `No command matching ${interaction.commandName} was found`,
          'CommandService.asyncInteraction',
        );

        return;
      }

      Logger.log(
        `commandName: ${interaction.commandName}`,
        'InteractionCalled',
      );

      try {
        await command.func(interaction);
      } catch (error) {
        Logger.error(error, error.stack);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          });
        }
      }
    });
  }
}
