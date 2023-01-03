export interface APIResponse<T extends string | LocaleNames> {
	character: Character<T>
	_links: {
		self: Href
	}
}

export type Character<T extends string | LocaleNames> = KeyIdName<string> & {
	realm: Realm<T>
}

export type Realm<T extends string | LocaleNames> = KeyIdName<T> & {
	slug: string
}

export interface TypeName<T extends string | LocaleNames> {
	type: string
	name: T
}

export interface KeyId {
	key: Href
	id: number
}

export type KeyIdName<T extends string | LocaleNames> = KeyId & {
	name: T
}

export interface Href {
	href: string
}

export type Locale = 'en_US' | 'es_MX' | 'pt_BR' | 'de_DE' | 'en_GB' | 'es_ES' | 'fr_FR' | 'it_IT' | 'ru_RU' | 'ko_KR' | 'zh_TW' | 'zh_CN'

export type LocaleNames = {
	[key in Locale]: string
}

export type ValuableDisplayable<T extends string | LocaleNames> = Valuable & Displayable<T>

export interface Valuable {
	value: number
}

export interface Displayable<T extends string | LocaleNames> {
	display_string: T
}

export type Currency = 'gold' | 'silver' | 'copper'

export interface Sellable extends Valuable {
	display_strings: Record<Currency, LocaleNames> & {
		header: LocaleNames
	}
}
