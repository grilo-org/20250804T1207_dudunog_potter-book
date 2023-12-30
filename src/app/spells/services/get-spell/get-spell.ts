import { BaseApiResponse, ApiService } from '@/shared/core'
import { Spell } from '@/entities/Spell'
import { httpClient } from '@/infra'

export type GetSpellAPIResponse = BaseApiResponse<{
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
		slug: string
		wiki: string
	}
}>

export type GetSpellDTO = Spell

export type GetSpellRequest = {
	id: string
}

type GetSpellResponse = Promise<GetSpellDTO>

export const getSpell = new ApiService<GetSpellRequest, GetSpellResponse>({
	cacheKey: 'spell',
	handler: async request => {
		const {
			data: { data: spell },
		} = await httpClient.get<GetSpellAPIResponse>(`/spells/${request.id}`)

		return new Spell({
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
		})
	},
})
