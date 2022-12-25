import { REST, Routes } from 'discord.js'
import config from '../config/config.json'
import { logger } from '../services/logger'
import commands from './commands'

const rest = new REST({ version: '10' }).setToken(config.discord.token);

const deploy = async () => {
	try {
		logger.info('Starting deploying commands...')

		await rest.put(Routes.applicationCommands(config.discord.clientId), {
			body: commands.map(command => command.data)
		})

		logger.info('Successfully deployed commands.')
	} catch (error) {
		if (error instanceof Error) {
			logger.error(error.message)
		}
	}
}

deploy()
