import { ChannelType, Client, TextChannel } from 'discord.js'
import config from '../config/config.json'

export abstract class TextChannelJob {
	private client: Client<true>
	protected abstract callback: (channels: TextChannel[]) => void
	protected abstract interval: number

	constructor (client: Client<true>) {
		this.client = client
	}

	start = async () => {
		const channels = config.discord.channelsId.map(channelId => {
			const channel = this.client.channels.cache.get(channelId)

			if (channel == null || channel.type !== ChannelType.GuildText) {
				console.warn(`AchievementJob: channel ${channelId} is not found or is not a text channel.`)
			}

			return channel
		}).filter(channel => channel != null) as TextChannel[]

		if (channels.length === 0) {
			console.warn(`Could not start ${this.constructor.name}: no channel was found.`)
			return
		}

		setInterval(() => this.callback(channels), this.interval)

		console.info(`${this.constructor.name} was successfully started.`)
	}
}
