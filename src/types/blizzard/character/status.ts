import { APIResponse, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/status
 */
export interface CharacterStatusAPIResponse<T extends string | LocaleNames = string> extends Omit<APIResponse<T>, 'character'> {
	id: number
	is_valid: boolean
}
