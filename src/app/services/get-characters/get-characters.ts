import { BaseApiResponse, ApiService } from '@/app/core'
import { Character } from '@/app/entities/Character'
import { httpClient } from '@/app/infra'

export type GetCharactersAPIResponse = BaseApiResponse<
	{
		id: string
		type: string
		attributes: {
			born: string
			gender: string
			image: string
			jobs: string[]
			name: string
			nationality: string
			slug: string
			species: string
			wands: string[]
			wiki: string
		}
	}[]
>

export type GetCharactersDTO = Character

type GetCharactersRequest = {
	name: string
}

type GetCharactersResponse = Promise<GetCharactersDTO[]>

export const getCharacters = new ApiService<
	GetCharactersRequest,
	GetCharactersResponse
>({
	cacheKey: 'characters',
	handler: async request => {
		const { data } = await httpClient.get<GetCharactersAPIResponse>(
			`/characters?filter[name_cont]=${request.name}`,
		)

		return data.data.map(
			character =>
				new Character({
					id: character.id,
					type: character.type,
					born: character.attributes.born,
					gender: character.attributes.gender,
					image: character.attributes.image,
					jobs: character.attributes.jobs,
					name: character.attributes.name,
					nationality: character.attributes.nationality,
					slug: character.attributes.slug,
					species: character.attributes.species,
					wands: character.attributes.wands,
					wiki: character.attributes.wiki,
				}),
		)
	},
})
