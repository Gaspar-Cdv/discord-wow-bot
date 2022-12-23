import { APIResponse, Href, KeyIdName, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/quests
 */
export interface CharacterQuestsAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	in_progress: KeyIdName<string>[]
	completed: Href
}
