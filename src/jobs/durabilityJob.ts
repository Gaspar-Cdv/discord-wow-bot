import { blizzardAPIService } from '../services/blizzardAPI'
import { TextChannelJob } from './textChannelJob'
import characters from '../config/characters.json'

interface BrokenItem {
	characterName: string
	itemName: string
	current: number
	max: number
}

const parseDurability = (displayString: string): [current: number, max: number] => {
	const [current, max] = displayString.match(/[0-9]+/g)!.map(value => parseInt(value))
	return [current, max]
}

export class DurabilityJob extends TextChannelJob {
	protected override interval = 60

	protected override callback = () => {
		const brokenItems: BrokenItem[] = []

		Promise.all(characters.map(async (character) => {
			const equipment = await blizzardAPIService.getEquipment(character.realm, character.name)

			if (equipment == null) {
				return
			}

			equipment.equipped_items.forEach(item => {
				if (item.durability != null) {
					const [current, max] = parseDurability(item.durability.display_string)
					if (current / max <= 0.25) {
						brokenItems.push({
							characterName: character.name,
							itemName: item.name,
							current,
							max
						})
					}
				}
			})

			await Promise.all(brokenItems.map(async (item) => {
				if (item.current === 0) {
					this.sendToAllChannels(`Alert ${item.characterName}, your "${item.itemName} is broken!`)
				} else {
					this.sendToAllChannels(`Be careful ${item.characterName}, your "${item.itemName} is broken soon (${item.current}/${item.max})."`)
				}
			}))
		}))
	}
}

export const durabilityJob = new DurabilityJob()
