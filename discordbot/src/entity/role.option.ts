import { PermissionResolvable } from 'discord.js';

export type RoleOption = {
  name: string;
  permissionStr?: string;
  permissions?: PermissionResolvable;
  mentionable?: boolean;
  color?: number;
  rawPosition?: number;
};
