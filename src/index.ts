import { CacheType, ChatInputCommandInteraction, Client, GatewayIntentBits } from 'discord.js'
import commands from './commands/commands'
import { BOT_TOKEN } from './config.json'

const discord = new Client({
	intents: [GatewayIntentBits.Guilds]
})

discord.on('ready', client => {
	console.log(`Logged in as ${client.user.username}`)
})

const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const command = commands.find(command => command.data.name === interaction.commandName)

	if (command == null) {
		console.error(`Command name ${interaction.commandName} was not found`)
		return
	}

	await command.execute(interaction)
}

discord.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) {
		return
	}

	await execute(interaction)
})

discord.login(BOT_TOKEN)
