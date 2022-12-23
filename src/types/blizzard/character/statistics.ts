import { APIResponse, KeyIdName, LocaleNames } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/statistics
 */
export interface CharacterStatisticsAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	health: number
	power: number
	power_type: KeyIdName<T>
	speed: RatingBonus
	strength: BaseEffective
	agility: BaseEffective
	intellect: BaseEffective
	stamina: BaseEffective
	melee_crit: ValueRatingBonus
	melee_haste: ValueRatingBonus
	mastery: ValueRatingBonus
	bonus_armor: number
	lifesteal: ValueRatingBonus
	versatility: number
	versatility_damage_done_bonus: number
	versatility_healing_done_bonus: number
	versatility_damage_taken_bonus: number
	avoidance: RatingBonus
	attack_power: number
	main_hand_damage_min: number
	main_hand_damage_max: number
	main_hand_speed: number
	main_hand_dps: number
	off_hand_damage_min: number
	off_hand_damage_max: number
	off_hand_speed: number
	off_hand_dps: number
	spell_power: number
	spell_penetration: number
	spell_crit: ValueRatingBonus
	mana_regen: number
	mana_regen_combat: number
	armor: BaseEffective
	dodge: ValueRatingBonus
	parry: ValueRatingBonus
	block: ValueRatingBonus
	ranged_crit: ValueRatingBonus
	ranged_haste: ValueRatingBonus
	spell_haste: ValueRatingBonus
}

interface BaseEffective {
	base: number
	effective: number
}

interface RatingBonus {
	rating: number
	rating_bonus:number
}

type ValueRatingBonus = RatingBonus & {
	value: number
}
