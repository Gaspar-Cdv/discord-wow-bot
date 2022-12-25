import { CacheType, ChatInputCommandInteraction } from 'discord.js'

const ping = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	await interaction.reply('Pong')
}

export default ping
