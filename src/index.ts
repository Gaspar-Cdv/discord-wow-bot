import { Client, GatewayIntentBits } from 'discord.js'
import commands from './commands/commands'
import config from './config/config.json'

const discord = new Client({
	intents: [GatewayIntentBits.Guilds]
})

discord.on('ready', client => {
	console.info(`Logged in as ${client.user.username}.`)
})

discord.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) {
		return
	}

	const command = commands.find(command => command.data.name === interaction.commandName)

	if (command == null) {
		console.error(`Command name ${interaction.commandName} was not found.`)
		return
	}

	await command.execute(interaction)
})

discord.login(config.discord.token)
