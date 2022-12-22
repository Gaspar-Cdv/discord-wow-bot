import { REST, Routes } from 'discord.js'
import { BOT_TOKEN, CLIENT_ID } from '../config.json'
import commands from './commands'

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

const deploy = async () => {
	try {
		console.log('Starting deploying commands...')

		await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: commands.map(command => command.data)
		})

		console.log('Successfully deployed commands.')
	} catch (error) {
		console.error(error)
	}
}

deploy()
