import { Client, GatewayIntentBits } from 'discord.js'
import { BOT_TOKEN } from './config.json'

const discord = new Client({
	intents: [GatewayIntentBits.Guilds]
})

discord.on('ready', client => {
	console.log(`Logged in as ${client.user.username}`)
})

discord.login(BOT_TOKEN)
