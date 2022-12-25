import { CacheType, ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType, APIApplicationCommandOption } from 'discord.js'
import ping from './scripts/ping'
import ilvl from './scripts/ilvl'
import quests from './scripts/quests'
import allCharacters from '../config/characters.json'

const REALMS = ['dalaran', 'varimathras']

interface Command {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody
	execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}

export interface Character {
	name: string
	realm: string
}

/**
 * Get the character specified by the user in a 'CharacterOption' command, or all users if needed.
 */
export const getCharacters = (interaction: ChatInputCommandInteraction<CacheType>): Character[] => {
	const subCommand = interaction.options.getSubcommand(true) // can be a realm or 'all'
	return subCommand === 'all'
		? allCharacters
		: [{
			name: interaction.options.getString('character', true),
			realm: subCommand
		}]
}

/**
 * Create sub commands of a command to select one character, or all. E.g.\
 * `/command [realm] [character]` or\
 * `/command all`
 */
const createCharacterOptions = (): APIApplicationCommandOption[] => [
	{
		name: 'all',
		description: 'All characters',
		type: ApplicationCommandOptionType.Subcommand
	},
	...REALMS.map(realm => ({
		name: realm,
		description: 'The name of the realm',
		type: ApplicationCommandOptionType.Subcommand.valueOf(),
		options: [
			{
				name: 'character',
				description: 'The name of the character',
				type: ApplicationCommandOptionType.String,
				required: true
			}
		]
	}))
]

const commands: Command[] = [
	{
		data: {
			name: 'ping',
			description: 'Respond with pong',
		},
		execute: ping
	},
	{
		data: {
			name: 'quests',
			description: 'List all the quests of all characters'
		},
		execute: quests
	},
	{
		data: {
			name: 'ilvl',
			description: 'Get the ilvl of a character',
			options: createCharacterOptions()
		},
		execute: ilvl
	}
]

export default commands
