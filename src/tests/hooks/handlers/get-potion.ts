import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makePotionResponse = () => ({
	data: {
		id: 'af984889-3b1f-4b43-a49c-71c45d6fc012',
		type: 'potion',
		attributes: {
			slug: 'ageing-potion',
			characteristics: 'Green',
			difficulty: 'Advanced',
			effect: 'Aged drinker temporarily',
			image:
				'https://static.wikia.nocookie.net/harrypotter/images/5/51/Ageing_Potion_PM.png',
			inventors: '',
			ingredients: 'Newt spleens, Bananas, An orange snake, A green leaf',
			manufacturers: '',
			name: 'Ageing Potion',
			side_effects: '',
			time: '',
			wiki: 'https://harrypotter.fandom.com/wiki/Ageing_Potion',
		},
		links: {
			self: '/v1/potions/af984889-3b1f-4b43-a49c-71c45d6fc012',
		},
	},
	meta: {
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-30T15:14:46.329+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/potions/af984889-3b1f-4b43-a49c-71c45d6fc012',
	},
})

export const getPotionSuccessResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}potions/${id}`, async () => {
		return new Response(JSON.stringify(makePotionResponse()), {
			status: 200,
		})
	})

export const getPotionEmptyResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}potions/${id}`, async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	})

export const getPotionErrorResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}potions/${id}`, async () => {
		return new Response(null, {
			status: 500,
		})
	})
