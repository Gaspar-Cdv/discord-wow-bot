import { APIResponse, KeyIdName, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/quests/completed
 */
export interface CharacterQuestsCompletedAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	quests: KeyIdName<string>[]
}
