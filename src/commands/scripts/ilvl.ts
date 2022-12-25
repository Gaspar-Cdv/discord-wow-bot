import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'
import allCharacters from '../../config/characters.json'

interface Character {
	name: string
	realm: string
	ilvl?: number
}

/**
 * Comparator callback to sort characters by ilvl desc (with characters not found at the end).
 */
const byIlvlDesc = (a: Character, b: Character): number => {
	return (b.ilvl ?? -1) - (a.ilvl ?? -1)
}

const ilvl = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const subCommand = interaction.options.getSubcommand(true) // can be a realm or 'all'

	const characters: Character[] = subCommand === 'all'
		? allCharacters
		: [{
			name: interaction.options.getString('character', true),
			realm: subCommand
		}]

	await Promise.all(characters.map(async (character) => {
		const response = await blizzardAPIService.getCharacter(character.realm, character.name)
		character.ilvl = response?.equipped_item_level
	}))

	const messages: string[] = characters.sort(byIlvlDesc)
		.map(({ name, realm, ilvl }) => ilvl != null
			? `ilvl for ${name} : ${ilvl}`
			: `${name} was not found in ${realm}`
		)

	if (messages.length > 0) {
		await interaction.reply(messages.join('\n'))
	} else {
		await interaction.reply('No character was found.')
	}
}

export default ilvl
