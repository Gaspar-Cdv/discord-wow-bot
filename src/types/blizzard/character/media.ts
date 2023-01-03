import { APIResponse, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/character-media
 */
export interface CharacterMediaAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	assets: Asset[]
}

interface Asset {
	key: 'avatar' | 'inset' | 'main' | 'main-raw'
	value: string
}
