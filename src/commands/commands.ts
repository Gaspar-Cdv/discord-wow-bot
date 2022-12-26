import { CacheType, ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType, APIApplicationCommandOption } from 'discord.js'
import ping from './scripts/ping'
import ilvl from './scripts/ilvl'
import quests from './scripts/quests'
import renown from './scripts/renown'
import help from './scripts/help'

const REALMS = ['dalaran', 'varimathras']

interface Command {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody
	execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}

/**
 * Create sub commands of a command to select one character, or all. E.g.\
 * `/command [realm] [character]` or\
 * `/command all`
 * @param name The name of the command, used in description (e.g. "Get the [name] of all characters")
 */
const createCharacterOptions = (name: string): APIApplicationCommandOption[] => [
	{
		name: 'all',
		description: `Get the ${name} for all characters`,
		type: ApplicationCommandOptionType.Subcommand
	},
	...REALMS.map(realm => ({
		name: realm,
		description: `Get the ${name} of a character in ${realm}`,
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
			name: 'help',
			description: 'Get help about wow-bot',
		},
		execute: help
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
			options: createCharacterOptions('ilvl')
		},
		execute: ilvl
	},
	{
		data: {
			name: 'renown',
			description: 'Get the renown of a character',
			options: createCharacterOptions('renown')
		},
		execute: renown
	}
]

export default commands
