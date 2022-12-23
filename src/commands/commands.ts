import { CacheType, ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType } from 'discord.js'
import ping from './scripts/ping'
import ilvl from './scripts/ilvl'

interface Command {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody
	execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}

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
			name: 'ilvl',
			description: 'Get the ilvl of a character',
			options: [
				{
					name: 'dalaran',
					description: 'Dalaran realm',
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: 'character',
							description: 'The name of the character',
							type: ApplicationCommandOptionType.String
						}
					]
				},
				{
					name: 'varimathras',
					description: 'Varimathras realm',
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: 'character',
							description: 'The name of the character',
							type: ApplicationCommandOptionType.String
						}
					]
				}
			]
		},
		execute: ilvl
	}
]

export default commands
