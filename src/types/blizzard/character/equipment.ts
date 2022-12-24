import { APIResponse, Displayable, KeyId, KeyIdName, LocaleNames, Sellable, TypeName, Valuable, ValuableDisplayable } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/equipment
 */
export interface CharacterEquipmentAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	equipped_items: EquippedItem<T>[]
}

interface EquippedItem<T extends string | LocaleNames> {
	item: KeyId
	enchantments?: Enchantment<T>[]
	slot: TypeName<T>
	quantity: number
	context: number
	bonus_list: number[]
	timewalker_level?: number
	quality: TypeName<T>
	name: T
	media: KeyId
	item_class: KeyIdName<T>
	item_subclass: KeyIdName<T>
	inventory_type: TypeName<T>
	binding: TypeName<T>
	armor?: ValuableDisplayable<T>
	stats: Stat<T>[]
	sell_price: Sellable
	requirements: {
		level: ValuableDisplayable<T>
	}
	level: ValuableDisplayable<T>
	durability?: ValuableDisplayable<T>
	name_description?: DisplayableColorable<T>
	is_subClass_hidden?: boolean
}

interface Enchantment<T extends string | LocaleNames> extends Displayable<T> {
	enchantment_id: number
	enchantment_slot: {
		id: number
		type: string
	}
}

type Stat<T extends string | LocaleNames> = Valuable & {
	type: TypeName<T>
	display: DisplayableColorable<T>
}

type DisplayableColorable<T extends string | LocaleNames> = Displayable<T> & {
	color: Color
}

interface Color {
	r: number
	g: number
	b: number
	a: number
}
