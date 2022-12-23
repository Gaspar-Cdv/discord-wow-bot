import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../service/blizzardAPI'

const ilvl = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const realm = interaction.options.getSubcommand(true)
	const characterName = interaction.options.getString('character', true)
	const character = await blizzardAPIService.getCharacter(realm, characterName)

	await interaction.reply(`ilvl for ${characterName} : ${character.equipped_item_level}`)
}

export default ilvl
