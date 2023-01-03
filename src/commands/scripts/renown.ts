import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'
import { Reputation } from '../../types/blizzard/character/reputations'
import { Character, interactionService } from '../../services/interaction'

interface CharacterReputation extends Character {
	renowns?: Renown[]
}

interface Renown {
	name: string
	level: number
	value: number
	max: number
}

const toRenown = ({ faction, standing }: Reputation<string>): Renown => {
	return {
		name: faction.name,
		level: standing.renown_level!,
		value: standing.value,
		max: standing.max
	}
}

const populateRenowns = async (characters: CharacterReputation[]) => {
	await Promise.all(characters.map(async (character) => {
		const response = await blizzardAPIService.getReputations(character.realm, character.name)

		character.renowns = response?.reputations
			.filter(({ standing }) => standing.renown_level != null)
			.map(toRenown)
	}))
}

const getRenownMessage = ({ name, renowns: reputations }: CharacterReputation) => {
	const messageTitle = `**${name}**`
	const messageBody = reputations!
		.sort((a, b) => b.level - a.level || b.value - a.value)
		.map(reputation => `- ${reputation.name}: \`${reputation.level}\` (${reputation.value} / ${reputation.max})`)

	return [messageTitle, ...messageBody].join('\n')
}

const renown = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const characters: CharacterReputation[] = interactionService.getCharacters(interaction)
	await populateRenowns(characters)

	const messages: string[] = characters
		.filter(character => character.renowns != null && character.renowns.length > 0)
		.map(getRenownMessage)

	if (messages.length > 0) {
		await interaction.reply(messages.join('\n\n'))
	} else {
		await interaction.reply('No character was found.')
	}
}

export default renown
