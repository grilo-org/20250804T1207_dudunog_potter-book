import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makePotionListResponse = () => ({
	data: [
		{
			id: 'af984889-3b1f-4b43-a49c-71c45d6fc012',
			type: 'potion',
			attributes: {
				slug: 'ageing-potion',
				characteristics: 'Green',
				difficulty: 'Advanced',
				effect: 'Aged drinker temporarily',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/5/51/Ageing_Potion_PM.png',
				inventors: null,
				ingredients: 'Newt spleens, Bananas, An orange snake, A green leaf',
				manufacturers: null,
				name: 'Ageing Potion',
				side_effects: null,
				time: null,
				wiki: 'https://harrypotter.fandom.com/wiki/Ageing_Potion',
			},
			links: {
				self: '/v1/potions/af984889-3b1f-4b43-a49c-71c45d6fc012',
			},
		},
		{
			id: '78f43f9e-fb3a-4d27-99cb-b4d7674ef208',
			type: 'potion',
			attributes: {
				slug: 'alihotsy-draught',
				characteristics: 'Blue fumes and colour',
				difficulty: null,
				effect: 'Uncontrollable laughter',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/4/46/Alihotsy_Draught.png',
				inventors: null,
				ingredients: 'Alihotsy',
				manufacturers: null,
				name: 'Alihotsy Draught',
				side_effects: null,
				time: null,
				wiki: 'https://harrypotter.fandom.com/wiki/Alihotsy_Draught',
			},
			links: {
				self: '/v1/potions/78f43f9e-fb3a-4d27-99cb-b4d7674ef208',
			},
		},
		{
			id: '04f6e0eb-5695-469f-8b07-ff1264d78178',
			type: 'potion',
			attributes: {
				slug: 'amortentia',
				characteristics:
					'Mother-of-pearl sheen, Spiralling steam, Scent was multi-faceted and varied based on what the person liked',
				difficulty: 'Advanced',
				effect:
					'Love potion that caused a powerful infatuation or obsession in the drinker',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/4/49/Amortentia.png',
				inventors: null,
				ingredients: 'Pearl Dust',
				manufacturers: null,
				name: 'Amortentia',
				side_effects: null,
				time: null,
				wiki: 'https://harrypotter.fandom.com/wiki/Amortentia',
			},
			links: {
				self: '/v1/potions/04f6e0eb-5695-469f-8b07-ff1264d78178',
			},
		},
		{
			id: '57dffd3c-6d46-4de8-96cb-dea64ac6d3e2',
			type: 'potion',
			attributes: {
				slug: 'angel-s-trumpet-draught',
				characteristics: null,
				difficulty: null,
				effect: 'Poisonous',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/c/c8/Angels_Trumpet_Draught.JPG',
				inventors: null,
				ingredients: "Angel's Trumpet",
				manufacturers: null,
				name: "Angel's Trumpet Draught",
				side_effects: null,
				time: null,
				wiki: "https://harrypotter.fandom.com/wiki/Angel's_Trumpet_Draught",
			},
			links: {
				self: '/v1/potions/57dffd3c-6d46-4de8-96cb-dea64ac6d3e2',
			},
		},
		{
			id: 'f9b6cfa8-fe9a-45a8-a159-8a75a0694e66',
			type: 'potion',
			attributes: {
				slug: 'antidote',
				characteristics: null,
				difficulty: null,
				effect: null,
				image: null,
				inventors: null,
				ingredients: null,
				manufacturers: null,
				name: 'Antidote',
				side_effects: null,
				time: null,
				wiki: 'https://harrypotter.fandom.com/wiki/Antidote',
			},
			links: {
				self: '/v1/potions/f9b6cfa8-fe9a-45a8-a159-8a75a0694e66',
			},
		},
	],
	meta: {
		pagination: {
			current: 1,
			next: 2,
			last: 16,
			records: 156,
		},
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-29T23:21:04.951+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/potions?page[number]=1\u0026page[size]=10\u0026',
		current:
			'https://api.potterdb.com/v1/potions?page[number]=1\u0026page[size]=10',
		next: 'https://api.potterdb.com/v1/potions?page[number]=2\u0026page[size]=10',
		last: 'https://api.potterdb.com/v1/potions?page[number]=16\u0026page[size]=10',
	},
})

export const getPotionsSuccessResponseHandler = http.get(
	`${BASE_API_URL}potions`,
	async () => {
		return new Response(JSON.stringify(makePotionListResponse()), {
			status: 200,
		})
	},
)

export const getPotionsEmptyResponseHandler = http.get(
	`${BASE_API_URL}potions`,
	async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	},
)

export const getPotionsErrorResponseHandler = http.get(
	`${BASE_API_URL}potions`,
	async () => {
		return new Response(null, {
			status: 500,
		})
	},
)
