import { INestApplication } from '@nestjs/common';
import { Guild } from 'discord.js';
import { ServerService } from 'src/service/server.service';
import { discord } from '../../config.json';

export class ServerManager {
  private serverService: ServerService;

  constructor(app: INestApplication<any>) {
    this.serverService = app.get(ServerService);
  }

  public init(guild: Guild) {
    this.serverService.setGuild(guild);
    this.serverService.createRoles(discord.roles);
  }
}
