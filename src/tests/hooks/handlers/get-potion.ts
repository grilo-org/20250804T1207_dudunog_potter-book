import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makePotionResponse = () => ({
	data: {
		id: '04f6e0eb-5695-469f-8b07-ff1264d78178',
		type: 'potion',
		attributes: {
			slug: 'ageing-potion',
			characteristics: 'Green',
			difficulty: 'Advanced',
			effect: 'Aged drinker temporarily',
			image:
				'https://static.wikia.nocookie.net/harrypotter/images/5/51/Ageing_Potion_PM.png',
			inventors: 'Fred and George Weasley',
			ingredients: 'Newt spleens, Bananas, An orange snake, A green leaf',
			manufacturers: 'Fred and George Weasley',
			name: 'Ageing Potion',
			side_effects: 'test',
			time: 'Six hours',
			wiki: 'https://harrypotter.fandom.com/wiki/Amortentia',
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

export const getPotionNotFoundResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}potions/${id}`, async () => {
		return new Response(
			JSON.stringify({
				errors: [
					{
						status: '404',
						source: null,
						title: 'Not Found',
						detail: `Couldn't find Potion with 'id'=${id}`,
					},
				],
			}),
			{
				status: 404,
			},
		)
	})
