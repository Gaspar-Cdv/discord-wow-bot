import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { blizzardAPIService } from '../../services/blizzardAPI'
import characters from '../../config/characters.json'
import { logger } from '../../services/logger'
import { interactionService } from '../../services/interaction'

interface Quest {
	name: string
	inProgress: string[]
	completed: string[]
}

const populateQuestsInProgress = async (allQuests: Record<number, Quest>): Promise<void> => {
	await Promise.all(characters.map(async (character) => {
		const quests = await blizzardAPIService.getQuests(character.realm, character.name)

		if (quests == null) {
			return
		}

		quests.in_progress?.forEach(quest => {
			if (allQuests[quest.id] == null) {
				allQuests[quest.id] = {
					name: quest.name,
					inProgress: [],
					completed: []
				}
			}

			allQuests[quest.id].inProgress.push(`\`${character.name}\``)
		})
	}))
}

const populateQuestsCompleted = async (allQuests: Record<number, Quest>): Promise<void> => {
	await Promise.all(characters.map(async (character) => {
		const questsCompleted = await blizzardAPIService.getQuestsCompleted(character.realm, character.name)

		if (questsCompleted == null) {
			return
		}

		Object.keys(allQuests)
			.map(quest => parseInt(quest))
			.forEach(questId => {
				if (questsCompleted.quests.some(quest => quest.id === questId)) {
					allQuests[questId].completed.push(`\`${character.name}\``)
				}
			})
	}))
}

/**
 * Comparator callback to sort quests first by number of characters that are in progress (desc),
 * then by number of characters that have completed (asc)
 */
const byNumberOfCharactersInvolved = (a: Quest, b: Quest) => {
	return b.inProgress.length - a.inProgress.length || a.completed.length - b.completed.length
}

/**
 * Filter callback to remove quests in progress for only one character and not completed by anybody else
 */
const soloQuests = (quest: Quest) => {
	return quest.inProgress.length > 1 || quest.completed.length > 0
}

const getAllQuests = async (): Promise<Quest[]> => {
	const allQuests: Record<number, Quest> = {}

	await populateQuestsInProgress(allQuests)
	await populateQuestsCompleted(allQuests)

	return Object.values(allQuests).filter(soloQuests).sort(byNumberOfCharactersInvolved)
}

const getQuestMessage = (quest: Quest): string => {
	const questMessage = [
		`**${quest.name}:**`,
		`- In progress: ${quest.inProgress.join(', ')}`
	]

	if (quest.completed.length > 0) {
		questMessage.push(`- Completed: ${quest.completed.join(', ')}`)
	}

	return questMessage.join('\n')
}

const quests = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	if (characters.length === 0) {
		interaction.reply('No character was found.')
		return
	}

	const time = Date.now()
	const allQuests = await getAllQuests()

	const messages = interactionService.getAllMessages(allQuests, getQuestMessage)
	logger.info(`Quests command completed in ${(Date.now() - time) / 1000}s`)

	await interaction.reply('Quests list')
	for (const message of messages) {
		await interaction.followUp(message)
	}
}

export default quests
