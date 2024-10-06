import { INestApplication } from '@nestjs/common';
import { CommandManager } from './command.manager';
import { ServerManager } from './server.manager';

export class ManagerFactory {
  private commandManager: CommandManager;
  private serverManager: ServerManager;

  constructor(app: INestApplication<any>) {
    this.commandManager = new CommandManager(app);
    this.serverManager = new ServerManager(app);
  }

  getCommandManager() {
    return this.commandManager;
  }

  getServerManager() {
    return this.serverManager;
  }
}
