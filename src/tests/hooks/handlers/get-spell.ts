import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeSpellResponse = () => ({
	data: {
		id: '91210019-bbe2-4e02-be37-6872c033fd6b',
		type: 'spell',
		attributes: {
			slug: 'alarte-ascendare',
			category: 'Charm',
			creator: 'test',
			effect: 'Rockets target upward',
			hand: 'Brandish wand',
			image:
				'https://static.wikia.nocookie.net/harrypotter/images/c/c4/Alarte_Ascendare.gif',
			incantation: 'Alarte Ascendare(a-LAR-tay a-SEN-der-ay)',
			light: 'Red',
			name: 'Alarte Ascendare',
			wiki: 'https://harrypotter.fandom.com/wiki/Anteoculatia',
		},
		links: {
			self: '/v1/spells/363adee4-5b00-47cc-9dab-a2ab5bbbaae4',
		},
	},
	meta: {
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-30T15:23:16.394+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/spells/363adee4-5b00-47cc-9dab-a2ab5bbbaae4',
	},
})

export const getSpellSuccessResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}spells/${id}`, async () => {
		return new Response(JSON.stringify(makeSpellResponse()), {
			status: 200,
		})
	})

export const getSpellEmptyResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}spells/${id}`, async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	})

export const getSpellErrorResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}spells/${id}`, async () => {
		return new Response(null, {
			status: 500,
		})
	})

export const getSpellNotFoundResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}spells/${id}`, async () => {
		return new Response(
			JSON.stringify({
				errors: [
					{
						status: '404',
						source: null,
						title: 'Not Found',
						detail: `Couldn't find Spell with 'id'=${id}`,
					},
				],
			}),
			{
				status: 404,
			},
		)
	})
