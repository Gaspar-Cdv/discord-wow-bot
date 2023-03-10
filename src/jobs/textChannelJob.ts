import { ChannelType, Client, TextChannel } from 'discord.js'
import config from '../config/config.json'
import { logger } from '../services/logger'

export abstract class TextChannelJob {
	protected abstract callback: () => void
	protected abstract interval: number // in seconds
	private channels?: TextChannel[]

	start = async (client: Client<true>) => {
		this.channels = config.discord.channelsId.map(channelId => {
			const channel = client.channels.cache.get(channelId)

			if (channel == null || channel.type !== ChannelType.GuildText) {
				logger.warn(`AchievementJob: channel ${channelId} is not found or is not a text channel.`)
			}

			return channel
		}).filter(channel => channel != null) as TextChannel[]

		if (this.channels.length === 0) {
			logger.warn(`Could not start ${this.constructor.name}: no channel was found.`)
			return
		}

		logger.info(`${this.constructor.name} was successfully started.`)

		setInterval(() => this.callback(), this.interval * 1000)
	}

	protected sendToAllChannels = async (message: string) => {
		if (this.channels == null) {
			logger.error(`Could not send message to all channels from ${this.constructor.name}.`)
			return
		}

		await Promise.all(this.channels.map(async (channel) => {
			await channel.send(message)
		}))
	}
}
