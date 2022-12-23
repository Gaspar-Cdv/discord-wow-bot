import { REST, Routes } from 'discord.js'
import config from '../config.json'
import commands from './commands'

const rest = new REST({ version: '10' }).setToken(config.discord.token);

const deploy = async () => {
	try {
		console.log('Starting deploying commands...')

		await rest.put(Routes.applicationCommands(config.discord.clientId), {
			body: commands.map(command => command.data)
		})

		console.log('Successfully deployed commands.')
	} catch (error) {
		console.error(error)
	}
}

deploy()
