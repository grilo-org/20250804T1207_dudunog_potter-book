import { BaseApiResponse, ApiService } from '@/app/core'
import { Potion } from '@/app/entities/Potion'
import { httpClient } from '@/app/infra'

export type GetPotionsAPIResponse = BaseApiResponse<
	{
		id: string
		type: string
		attributes: {
			characteristics: string
			difficulty: string
			effect: string
			image: string
			ingredients: string
			inventors: string
			manufacturers: string
			name: string
			side_effects: string
			slug: string
			time: string
			wiki: string
		}
	}[]
>

export type GetPotionsDTO = Potion

type GetPotionsRequest = {
	name: string
}

type GetPotionsResponse = Promise<GetPotionsDTO[]>

export const getPotions = new ApiService<GetPotionsRequest, GetPotionsResponse>(
	{
		cacheKey: 'potions',
		handler: async request => {
			const { data } = await httpClient.get<GetPotionsAPIResponse>(
				`/potions?filter[name_cont]=${request.name}`,
			)

			return data.data.map(
				potion =>
					new Potion({
						id: potion.id,
						type: potion.type,
						characteristics: potion.attributes.characteristics,
						difficulty: potion.attributes.difficulty,
						effect: potion.attributes.effect,
						image: potion.attributes.image,
						ingredients: potion.attributes.ingredients,
						inventors: potion.attributes.inventors,
						manufacturers: potion.attributes.manufacturers,
						name: potion.attributes.name,
						side_effects: potion.attributes.side_effects,
						slug: potion.attributes.slug,
						time: potion.attributes.time,
						wiki: potion.attributes.wiki,
					}),
			)
		},
	},
)
