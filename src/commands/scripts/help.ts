import { CacheType, ChatInputCommandInteraction } from 'discord.js'

const help = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	const messages = [
		'**Wow-bot help**',
		'- `/ilvl [realm] [character]`: get the ilvl of a specific character.',
		'- `/ilvl all`: get the ilvl of all users registred in the server.',
		'- `/renown [realm] [character]`: get the renown of a specific character.',
		'- `/renown all`: get the renown of all users registred in the server.',
		'- `/quests`: get a list of quests in common to all users registred in the server.',
	]
	await interaction.reply(messages.join('\n'))
}

export default help
