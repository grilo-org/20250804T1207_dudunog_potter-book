import { BaseApiResponse, ApiService } from '@/app/core'
import { Character } from '@/app/entities/Character'
import { Pagination } from '@/app/entities/Pagination'
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

export type GetCharactersRequest = {
	name?: string
	currentPage: number
	rowsPerPage: number
}

type GetCharactersResponse = Promise<Pagination<GetCharactersDTO[]>>

export const getCharacters = new ApiService<
	GetCharactersRequest,
	GetCharactersResponse
>({
	cacheKey: 'characters',
	handler: async request => {
		const { data } = await httpClient.get<GetCharactersAPIResponse>(
			`/characters?
				page[number]=${request.currentPage}&
				page[size]=${request.rowsPerPage}&
				${request.name ? `filter[name_cont]=${request.name}` : ''}`,
		)

		const characters = data.data.map(
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

		return new Pagination({
			itemsPerPage: 10,
			data: characters,
			page: data.meta?.pagination.current,
			totalPages: data.meta.pagination.last,
			totalRows: data.meta.pagination.records,
		})
	},
})
