import { APIResponse, Displayable, KeyId, KeyIdName, LocaleNames, Sellable, TypeName, Valuable, ValuableDisplayable } from '../common'

/**
 * /profile/wow/character/[realm]/[character]/equipment
 */
export interface CharacterEquipmentAPIResponse<T extends string | LocaleNames = string> extends APIResponse<T> {
	equipped_items: EquippedItem<T>[]
}

interface EquippedItem<T extends string | LocaleNames> {
	item: KeyId
	slot: TypeName<T>
	quantity: number
	context: number
	bonus_list: number[]
	quality: TypeName<T>
	name: T
	media: KeyId
	item_class: KeyIdName<T>
	item_subclass: KeyIdName<T>
	inventory_type: TypeName<T>
	binding: TypeName<T>
	armor: ValuableDisplayable
	stats: Stat<T>[]
	sell_price: Sellable
	requirements: {
		level: ValuableDisplayable
	}
	level: ValuableDisplayable
	durability: ValuableDisplayable
}

type Stat<T extends string | LocaleNames> = Valuable & {
	type: TypeName<T>
	display: DisplayableColorable
}

type DisplayableColorable = Displayable & {
	color: Color
}

interface Color {
	r: number
	g: number
	b: number
	a: number
}
