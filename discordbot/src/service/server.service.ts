import { Logger } from '@nestjs/common';
import { Collection, Guild, PermissionResolvable, Role } from 'discord.js';
import { RoleOption } from 'src/entity/role.option';

export class ServerService {
  private guild: Guild;

  public setGuild(guild: Guild) {
    this.guild = guild;
  }

  async getGuild() {
    return this.guild;
  }

  public async getRoles(): Promise<Collection<string, Role>> {
    const roles = await this.guild.roles.fetch();
    return roles;
  }

  public createRole(role: RoleOption) {
    this.guild.roles.create(role);
    Logger.log(`Created role: ${role.name}`, 'ServerService.createRole');
  }

  public createRoles(roles: RoleOption[]) {
    const serverRolesPromise = this.getRoles();
    serverRolesPromise.then((roleDict: Collection<string, Role>) => {
      const serverRoles: Role[] = Array.from(roleDict.values());
      const serverRoleNames: string[] = serverRoles.map(
        (role: Role) => role.name,
      );

      for (const role of roles) {
        role.permissions = this.numberStringToPermission(role.permissionStr);
        if (!serverRoleNames.includes(role.name)) this.createRole(role);
      }
    });
  }

  private numberStringToPermission(numberStr: string): PermissionResolvable {
    return BigInt(numberStr);
  }
}
