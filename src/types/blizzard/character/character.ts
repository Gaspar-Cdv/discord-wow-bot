import { APIResponse, Href, KeyIdName, LocaleNames, Realm, TypeName } from '../common'

/**
 * /profile/wow/character/[realm]/[character]
 */
export interface CharacterAPIResponse<T extends string | LocaleNames = string> extends Omit<APIResponse<T>, 'character'> {
	id: number
	name: string
	realm: Realm<T>

	gender: TypeName<T>
	faction: TypeName<T>
	race: KeyIdName<T>
	character_class: KeyIdName<T>
	active_spec: KeyIdName<T>

	level: number
	experience: number
	achievement_points: number
	last_login_timestamp: number
	average_item_level: number
	equipped_item_level: number

	covenant_progress: {
		chosen_covenant: KeyIdName<T>
		renom_level: number
		soulbinds: Href
	}

	achievements: Href
	titles: Href
	pvp_summary: Href
	encounters: Href
	media: Href
	specializations: Href
	statistics: Href
	mythic_keystone_profile: Href
	equipment: Href
	appearance: Href
	collections: Href
	reputations: Href
	quests: Href
	achievements_statistics: Href
	professions: Href
}
