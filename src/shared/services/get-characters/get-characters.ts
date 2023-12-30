import { BaseApiResponse, ApiService } from '@/shared/core'
import { Character } from '@/entities/Character'
import { Pagination } from '@/entities/Pagination'
import { httpClient } from '@/infra'

export type GetCharactersAPIResponse = BaseApiResponse<
	{
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
			slug: string
			species: string
			wands: string[]
			weight: string
			boggart: string
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
				${request?.currentPage ? `page[number]=${request?.currentPage}` : ''}&
				${request?.rowsPerPage ? `page[size]=${request?.rowsPerPage}` : ''}&
				${request?.name ? `filter[name_cont]=${request?.name}` : ''}`,
		)

		const characters = data.data.map(
			character =>
				new Character({
					id: character.id,
					type: character.type,
					aliasNames: character.attributes.alias_names,
					born: character.attributes.born,
					eyeColor: character.attributes.eye_color,
					familyMembers: character.attributes.family_members,
					bloodStatus: character.attributes.blood_status,
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
					slug: character.attributes.slug,
					species: character.attributes.species,
					wands: character.attributes.wands,
					weight: character.attributes.weight,
					boggart: character.attributes.boggart,
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
