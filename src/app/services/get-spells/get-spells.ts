import { BaseApiResponse, ApiService } from '@/app/core'
import { Spell } from '@/app/entities/Spell'
import { httpClient } from '@/app/infra'

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

type GetSpellsRequest = {
	name: string
}

type GetSpellsResponse = Promise<GetSpellsDTO[]>

export const getSpells = new ApiService<GetSpellsRequest, GetSpellsResponse>({
	cacheKey: 'spells',
	handler: async request => {
		const { data } = await httpClient.get<GetSpellsAPIResponse>(
			`/spells?filter[name_cont]=${request.name}`,
		)

		return data.data.map(
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
	},
})
