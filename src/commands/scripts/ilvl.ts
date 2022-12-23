import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'

const ilvl = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const realm = interaction.options.getSubcommand(true)
	const characterName = interaction.options.getString('character', true)
	const character = await blizzardAPIService.getCharacter(realm, characterName)

	if (character != null) {
		await interaction.reply(`ilvl for ${characterName} : ${character.equipped_item_level}`)
	} else {
		await interaction.reply(`${characterName} was not fount in ${realm}`)
	}
}

export default ilvl
