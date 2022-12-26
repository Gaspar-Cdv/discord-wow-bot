import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'
import { interactionService } from '../../services/interaction'

const selfie = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const character = interactionService.getCharacter(interaction)
	const media = await blizzardAPIService.getCharacterMedia(character.realm, character.name)

	if (media == null) {
		await interaction.reply(`The character ${character.name} does not exist in ${character.realm}`)
		return
	}

	const { value } = media.assets.find(asset => asset.key === 'main')!

	await interaction.reply(value)
}

export default selfie
