import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'
import { Character, interactionService } from '../../services/interaction'

interface CharacterIlvl extends Character {
	ilvl?: number
}

const populateIlvl = async (characters: CharacterIlvl[]) => {
	await Promise.all(characters.map(async (character) => {
		const response = await blizzardAPIService.getCharacter(character.realm, character.name)
		character.ilvl = response?.equipped_item_level
	}))
}

const ilvl = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const characters: CharacterIlvl[] = interactionService.getCharacters(interaction)
	await populateIlvl(characters)

	const messages: string[] = characters
		.filter(character => character.ilvl != null)
		.sort((a, b) => b.ilvl! - a.ilvl!)
		.map(({ name, ilvl }) => `The ilvl of \`${name}\` is **${ilvl}**`
		)

	if (messages.length > 0) {
		await interaction.reply(messages.join('\n'))
	} else {
		await interaction.reply('No character was found.')
	}
}

export default ilvl
