import { Client, GatewayIntentBits } from 'discord.js'
import commands from './commands/commands'
import config from './config/config.json'
import { logger } from './services/logger'

const discord = new Client({
	intents: [GatewayIntentBits.Guilds]
})

const startJobs = (client: Client<true>) => {
	// myJob.start(client)
}

discord.on('ready', client => {
	logger.info(`Logged in as ${client.user.username}.`)

	startJobs(client)
})

discord.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) {
		return
	}

	const command = commands.find(command => command.data.name === interaction.commandName)

	if (command == null) {
		logger.error(`Command name ${interaction.commandName} was not found.`)
		return
	}

	await command.execute(interaction)
})

discord.login(config.discord.token)
