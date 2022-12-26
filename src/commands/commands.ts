import { CacheType, ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType, APIApplicationCommandOption } from 'discord.js'
import ping from './scripts/ping'
import ilvl from './scripts/ilvl'
import quests from './scripts/quests'
import renown from './scripts/renown'

const REALMS = ['dalaran', 'varimathras']

interface Command {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody
	execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
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
	},
	{
		data: {
			name: 'renown',
			description: 'Get the renown of a character',
			options: createCharacterOptions()
		},
		execute: renown
	}
]

export default commands
