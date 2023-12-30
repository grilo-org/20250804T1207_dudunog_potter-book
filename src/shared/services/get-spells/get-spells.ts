import { BaseApiResponse, ApiService } from '@/shared/core'
import { Spell } from '@/entities/Spell'
import { Pagination } from '@/entities/Pagination'
import { httpClient } from '@/infra'

export type GetSpellsAPIResponse = BaseApiResponse<
	{
		id: string
		type: string
		attributes: {
			category: string
			creator: string
			effect: string
			hand: string
			image: string
			incantation: string
			light: string
			name: string
			slug: string[]
			wiki: string
		}
	}[]
>

export type GetSpellsDTO = Spell

export type GetSpellsRequest = {
	name?: string
	currentPage: number
	rowsPerPage: number
}

type GetSpellsResponse = Promise<Pagination<GetSpellsDTO[]>>

export const getSpells = new ApiService<GetSpellsRequest, GetSpellsResponse>({
	cacheKey: 'spells',
	handler: async request => {
		const { data } = await httpClient.get<GetSpellsAPIResponse>(
			`/spells?
				${request?.currentPage ? `page[number]=${request?.currentPage}` : ''}&
				${request?.rowsPerPage ? `page[size]=${request?.rowsPerPage}` : ''}&
				${request?.name ? `filter[name_cont]=${request?.name}` : ''}`,
		)

		const spells = data.data.map(
			spell =>
				new Spell({
					id: spell.id,
					type: spell.type,
					category: spell.attributes.category,
					creator: spell.attributes.creator,
					effect: spell.attributes.effect,
					hand: spell.attributes.hand,
					image: spell.attributes.image,
					incantation: spell.attributes.incantation,
					light: spell.attributes.light,
					name: spell.attributes.name,
					slug: spell.attributes.slug,
					wiki: spell.attributes.wiki,
				}),
		)

		return new Pagination({
			itemsPerPage: 10,
			data: spells,
			page: data.meta?.pagination.current,
			totalPages: data.meta.pagination.last,
			totalRows: data.meta.pagination.records,
		})
	},
})
