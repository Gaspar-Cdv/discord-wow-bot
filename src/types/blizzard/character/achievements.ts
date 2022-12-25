import { APIResponse, Href, KeyIdName, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/achievements
 */
export interface CharacterAchievementsAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	total_quantity: number
	total_points: number
	achievements: Achievement[]
	category_progress: CategoryProgress[]
	recent_events: RecentEvent[]
	statistics: Href
}

interface Achievement {
	id: number
	achievement: KeyIdName<string>
	criteria: Criteria
	completed_timestamp: number
}

interface Criteria {
	id: number
	is_completed: boolean
}

interface CategoryProgress {
	category: KeyIdName<string>
	quantity: number
	points: number
}

interface RecentEvent {
	achievement: KeyIdName<string>
	timestamp: number
}
