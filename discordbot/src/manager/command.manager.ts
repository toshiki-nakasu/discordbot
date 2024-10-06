import { INestApplication, Logger } from '@nestjs/common';
import { Client, REST } from 'discord.js';
import { CommandService } from 'src/service/command.service';
import { DiscordService } from 'src/service/discord.service';
import { discord, port } from '../../config.json';

export class CommandManager {
  private discordService: DiscordService;
  private commandService: CommandService;

  constructor(app: INestApplication<any>) {
    this.discordService = app.get(DiscordService);
    this.commandService = app.get(CommandService);
  }

  async init(app: INestApplication<any>): Promise<Client<boolean>> {
    const discordClient: Client<boolean> = this.discordService.getClient();
    const commands: Array<any> = this.commandService.build(discordClient);

    const restClient = new REST().setToken(discord.bot.token);
    const responsePromise: Promise<void> = this.commandService.register(
      restClient,
      commands,
    );
    responsePromise
      .then(() => {
        this.commandService.asyncInteraction(discordClient);
      })
      .catch((error) => {
        Logger.error(error, error.stack);
      });

    await app.listen(port, async () => {
      Logger.log(port, 'ListeningPort');
    });

    return discordClient;
  }
}
