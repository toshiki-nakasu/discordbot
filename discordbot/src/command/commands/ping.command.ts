import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandBasic } from '../command.basic';

export default new CommandBasic({
  builder: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('sample command'),
  func: async (interaction: CommandInteraction): Promise<any> => {
    await interaction.reply('Pong!');
  },
});
