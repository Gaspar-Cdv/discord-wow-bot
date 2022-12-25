import { APIResponse, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/achievements/statistics
 */
export interface CharacterAchievementsStatisticsAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	categories: CategoryGroup<T>[]
}

type CategoryGroup<T extends string | LocaleNames> = Category<T> & {
	sub_categories: Category<T>[]
}

interface Category<T extends string | LocaleNames> {
	id: number
	name: T
	statistics: Statistic<T>[]
}

interface Statistic<T extends string | LocaleNames> {
	id: number
	name: T
	last_updated_timestamp: number
	quantity: number
}
