import { Logger } from '@nestjs/common';
import { ActivityType, Client, Events, GatewayIntentBits } from 'discord.js';
import { discord } from '../../config.json';
import { Utility } from '../utility/utility';

export class DiscordService {
  private client: Client<boolean>;

  public connect(): Client<boolean> {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.client.once(Events.ClientReady, (readyClient: Client<true>) => {
      Logger.log(readyClient.user.tag, 'LoggedInUser');
      this.client.user?.setActivity('develop', { type: ActivityType.Custom });
    });

    this.client.login(discord.bot.token);
    return this.client;
  }

  public getClient(): Client<boolean> {
    let retClient = this.client;
    if (Utility.isNullOrUndefined(retClient)) {
      retClient = this.connect();
    }
    return retClient;
  }

  public createInvitation(): string {
    const apiBaseURI: string = 'https://discord.com/oauth2/authorize';
    let apiParams: Map<string, string>;
    apiParams.set('client_id', `${discord.bot.client_id}`);
    apiParams.set('permissions', '8');
    apiParams.set('integration_type', '0');
    apiParams.set('scope', 'applications.commands+bot');

    return apiBaseURI + '?' + Utility.paramToString(apiParams);
  }
}
