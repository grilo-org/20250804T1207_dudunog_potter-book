import { BaseApiResponse, ApiService } from '@/shared/core'
import { Character } from '@/entities/Character'
import { httpClient } from '@/infra'

export type GetCharacterAPIResponse = BaseApiResponse<{
	id: string
	type: string
	attributes: {
		alias_names: string[]
		blood_status: string
		born: string
		eye_color: string
		family_members: string[]
		gender: string
		hair_color: string
		height: string
		house: string
		image: string
		jobs: string[]
		marital_status: string
		name: string
		nationality: string
		patronus: string
		romances: string[]
		species: string
		wands: string[]
		weight: string
		boggart: string
		wiki: string
	}
}>

export type GetCharacterDTO = Character | null

export type GetCharacterRequest = {
	id: string
}

type GetCharacterResponse = Promise<GetCharacterDTO>

export const getCharacter = new ApiService<
	GetCharacterRequest,
	GetCharacterResponse
>({
	cacheKey: 'character',
	handler: async request => {
		const {
			data: { data: character },
		} = await httpClient.get<GetCharacterAPIResponse>(
			`/characters/${request.id}`,
		)

		if (!character) {
			return null
		}

		return new Character({
			id: character.id,
			type: character.type,
			aliasNames: character.attributes.alias_names,
			bloodStatus: character.attributes.blood_status,
			born: character.attributes.born,
			eyeColor: character.attributes.eye_color,
			familyMembers: character.attributes.family_members,
			gender: character.attributes.gender,
			hairColor: character.attributes.hair_color,
			height: character.attributes.height,
			house: character.attributes.house,
			image: character.attributes.image,
			jobs: character.attributes.jobs,
			maritalStatus: character.attributes.marital_status,
			name: character.attributes.name,
			nationality: character.attributes.nationality,
			patronus: character.attributes.patronus,
			romances: character.attributes.romances,
			species: character.attributes.species,
			wands: character.attributes.wands,
			weight: character.attributes.weight,
			boggart: character.attributes.boggart,
			wiki: character.attributes.wiki,
		})
	},
})
