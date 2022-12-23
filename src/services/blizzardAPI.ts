import axios, { AxiosError } from 'axios'
import FormData from 'form-data'
import config from '../config.json'
import { CharacterAchievementsAPIResponse } from '../types/blizzard/character/achievements'
import { CharacterAchievementsStatisticsAPIResponse } from '../types/blizzard/character/achievementsStatistics'
import { CharacterAPIResponse } from '../types/blizzard/character/character'
import { CharacterEquipmentAPIResponse } from '../types/blizzard/character/equipment'
import { CharacterQuestsAPIResponse } from '../types/blizzard/character/quests'
import { CharacterQuestsCompletedAPIResponse } from '../types/blizzard/character/questsCompleted'
import { CharacterStatisticsAPIResponse } from '../types/blizzard/character/statistics'
import { CharacterStatusAPIResponse } from '../types/blizzard/character/status'

type Namespace = 'profile-eu' | 'static-eu' | 'dynamic-eu'

interface OAuthData {
	access_token: string
	token_type: string
	expires_in: number
	sub: string
}

class BlizzardAPIService {
	private ACCESS_TOKEN_URL = 'https://oauth.battle.net/token'
	private API_BASE_URL = 'https://eu.api.blizzard.com'

	getCharacter = async <T = CharacterAPIResponse>(realm: string, character: string, subPath?: string): Promise<T | undefined> => {
		let url = `profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}`
		if (subPath != null) {
			url += `/${subPath}`
		}
		return this.fetchBlizzardApi<T>(url)
	}

	getEquipment = async (realm: string, character: string): Promise<CharacterEquipmentAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'equipment')
	}

	getAchievements = async (realm: string, character: string): Promise<CharacterAchievementsAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'achievements')
	}

	getAchievementsStatistics = async (realm: string, character: string): Promise<CharacterAchievementsStatisticsAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'achievements/statistics')
	}

	getQuests = async (realm: string, character: string): Promise<CharacterQuestsAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'quests')
	}

	getQuestsCompleted = async (realm: string, character: string): Promise<CharacterQuestsCompletedAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'quests/completed')
	}

	getStatistics = async (realm: string, character: string): Promise<CharacterStatisticsAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'statistics')
	}

	getStatus = async (realm: string, character: string): Promise<CharacterStatusAPIResponse | undefined> => {
		return this.getCharacter(realm, character, 'status')
	}

	private fetchBlizzardApi = async <T = any> (path: string, namespace: Namespace = 'profile-eu'): Promise<T | undefined> => {
		const url = new URL(path, this.API_BASE_URL)
		url.searchParams.append('locale', 'fr_FR')
	
		try {
			const accessToken = await this.getAccessToken()
	
			const { data } = await axios.get<T>(url.toString(), {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Battlenet-Namespace' : namespace
				}
			})
	
			return data
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(`Error while fetching blizzard API at ${url.toString()} (${error.message})`)
				return
			}

			throw error
		}
	}

	private getAccessToken = async () => {
		const body = new FormData()
		body.append('grant_type', 'client_credentials')
	
		try {
			const { data } = await axios.post<OAuthData>(this.ACCESS_TOKEN_URL, body, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Basic ${Buffer.from(config.blizzard.clientId + ':' + config.blizzard.secret).toString('base64')}`
				}
			})
	
			return data.access_token
		} catch (e) {
			console.error(e)
			return null
		}
	}

}

export const blizzardAPIService = new BlizzardAPIService()
