import { APIResponse, KeyIdName, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/reputations
 */
export interface CharacterReputationsAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	reputations: Reputation<T>[]
}

interface Reputation<T extends string | LocaleNames> {
	faction: KeyIdName<T>
	standing: Standing
}

interface Standing {
	raw: number
	value: number
	max: number
	tier: number
	name: string
}
