import {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  SlashCommandBuilder,
} from 'discord.js';
import { CommandBasic } from '../command.basic';
import { Utility } from 'src/utility/utility';

export default new CommandBasic({
  builder: new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('roulette')
    .addStringOption((option) =>
      option.setName('csv').setDescription('input comma separated values'),
    ),
  func: async (interaction: CommandInteraction): Promise<any> => {
    const csvObj: CommandInteractionOption<CacheType> =
      interaction.options.get('csv');
    const csvString: string = Utility.isNullOrUndefined(csvObj)
      ? ''
      : csvObj.value.toString();
    const csv: string[] = csvString.split(',').map((string) => string.trim());

    const randNumber: number = Utility.getRandomNumber(csv.length - 1, 0);
    await interaction.reply('roulette result: ' + csv[randNumber]);
  },
});
