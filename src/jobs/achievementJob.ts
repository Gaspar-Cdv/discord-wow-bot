import { blizzardAPIService } from '../services/blizzardAPI'
import { TextChannelJob } from './textChannelJob'
import characters from '../config/characters.json'

export class AchievementJob extends TextChannelJob {
	protected override interval = 10

	protected override callback = () => {
		Promise.all(characters.map(async (character) => {
			const now = Date.now()
			const achievements = await blizzardAPIService.getAchievements(character.realm, character.name)

			if (achievements == null) {
				return
			}

			const recentEvents = achievements.recent_events.filter(event => now - event.timestamp < this.interval * 1500)
			await Promise.all(recentEvents.map(async (event) => {
				await this.sendToAllChannels(`Congratulations ${character.name} for the "${event.achievement.name}" achievement!`)
			}))
		}))
	}
}

export const achievementJob = new AchievementJob()
