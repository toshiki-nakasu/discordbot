import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServerService } from 'src/service/server.service';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { CommandService } from '../service/command.service';
import { DiscordService } from '../service/discord.service';
import { AppController } from './app.controller';

@Module({
  imports: [CommandService, DiscordService, ServerService],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
  exports: [],
})
export class AppModule {}
