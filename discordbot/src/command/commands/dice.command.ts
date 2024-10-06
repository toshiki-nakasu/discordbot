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
    .setName('dice')
    .setDescription('dice roll')
    .addNumberOption((option) =>
      option
        .setName('max')
        .setDescription('random max value (Default: 6)')
        .setMinValue(0),
    ),
  func: async (interaction: CommandInteraction): Promise<any> => {
    const min: number = 1;
    const maxObj: CommandInteractionOption<CacheType> =
      interaction.options.get('max');
    const max: number = Utility.isNullOrUndefined(maxObj)
      ? 6
      : Number(maxObj.value);

    const result: string = Utility.getRandomNumber(max, min).toString();
    await interaction.reply('dice result: ' + result);
  },
});
