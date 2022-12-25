import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import allCharacters from '../config/characters.json'

export interface Character {
	name: string
	realm: string
}

class InteractionService {
	private static MAX_MESSAGE_LENGTH = 2000

	/**
	 * Discord messages are limited in character so we need to split the full response to smaller responses.
	 */
	getAllMessages = <T> (items: T[], getMessage: (item: T) => string): string[] => {
		const messages: string[] = [] // list of all discord messages
		let message: string[] = [] // current message being created

		items.forEach(item => {
			const itemMessage = getMessage(item)

			if (message.join('\n\n').length + itemMessage.length > InteractionService.MAX_MESSAGE_LENGTH) {
				messages.push(message.join('\n\n'))
				message = []
			}

			message.push(itemMessage)
		})

		return messages.concat(message.join('\n\n'))
	}

	/**
	 * Get the character specified by the user in a 'CharacterOption' command, or all users if needed.
	 */
	getCharacters = (interaction: ChatInputCommandInteraction<CacheType>): Character[] => {
		const subCommand = interaction.options.getSubcommand(true) // can be a realm or 'all'

		return subCommand === 'all'
			? allCharacters
			: [{
				name: interaction.options.getString('character', true),
				realm: subCommand
			}]
	}
}

export const interactionService = new InteractionService()
