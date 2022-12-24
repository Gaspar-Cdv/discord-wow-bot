import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'
import allCharacters from '../../config/characters.json'

const ilvl = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const subCommand = interaction.options.getSubcommand(true) // can be a realm or 'all'

	const characters = subCommand === 'all'
		? allCharacters
		: [{
			name: interaction.options.getString('character', true),
			realm: subCommand
		}]

	let messages: string[] = []
	for (let i = 0; i < characters.length; i++) {
		const character = await blizzardAPIService.getCharacter(characters[i].realm, characters[i].name)
		if (character != null) {
			messages.push(`ilvl for ${characters[i].name} : ${character.equipped_item_level}`)
		} else {
			messages.push(`${characters[i].name} was not found in ${characters[i].realm}`)
		}
	}

	if (messages.length > 0) {
		await interaction.reply(messages.join('\n'))
	} else {
		await interaction.reply('No character was found.')
	}
}

export default ilvl
