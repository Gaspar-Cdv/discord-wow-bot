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
					description: 'Get the ilvl of a character in Dalaran realm',
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: 'character',
							description: 'The name of the character',
							type: ApplicationCommandOptionType.String,
							required: true
						}
					]
				},
				{
					name: 'varimathras',
					description: 'Get the ilvl of a character in Varimathras realm',
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: 'character',
							description: 'The name of the character',
							type: ApplicationCommandOptionType.String,
							required: true
						}
					]
				}
			]
		},
		execute: ilvl
	}
]

export default commands
