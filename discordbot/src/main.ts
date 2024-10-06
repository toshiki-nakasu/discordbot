import { INestApplication, Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { logLevel, discord } from '../config.json';
import { AppModule } from './app/app.module';
import { ManagerFactory } from './manager/manager.factory';
import { Client, Guild } from 'discord.js';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    logger: logLevel as LogLevel[],
  });
  const managerFactory: ManagerFactory = new ManagerFactory(app);
  const discordClient: Client<boolean> = await managerFactory
    .getCommandManager()
    .init(app);
  const discordGuild: Guild = await discordClient.guilds.fetch(
    discord.guild_id,
  );
  managerFactory.getServerManager().init(discordGuild);
}
bootstrap();

process.on('uncaughtException', (error) => {
  Logger.error(`UNHANDLED ERROR => ${error.message}`, error.stack);
});
