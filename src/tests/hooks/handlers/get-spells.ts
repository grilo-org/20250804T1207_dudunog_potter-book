import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeSpellListResponse = () => ({
	data: [
		{
			id: '6fecfd3a-4f00-4574-940e-247d968fac75',
			attributes: {
				category: 'Charm',
				creator: null,
				effect:
					'Prevents people above or below a certain age from access to a target',
				hand: null,
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
				incantation: null,
				light: 'Blue',
				name: 'Age Line',
				wiki: 'https://harrypotter.fandom.com/wiki/Age_Line',
			},
			links: {
				self: '/v1/spells/6fecfd3a-4f00-4574-940e-247d968fac75',
			},
		},
		{
			id: '363adee4-5b00-47cc-9dab-a2ab5bbbaae4',
			attributes: {
				category: 'Charm',
				creator: null,
				effect: 'Rockets target upward',
				hand: 'Brandish wand',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/c/c4/Alarte_Ascendare.gif',
				incantation: 'Alarte Ascendare(a-LAR-tay a-SEN-der-ay)',
				light: 'Red',
				name: 'Alarte Ascendare',
				wiki: 'https://harrypotter.fandom.com/wiki/Alarte_Ascendare',
			},
			links: {
				self: '/v1/spells/363adee4-5b00-47cc-9dab-a2ab5bbbaae4',
			},
		},
		{
			id: 'fe351216-2b9b-49b2-bde0-b4c7b98cf125',
			attributes: {
				category: 'Spell',
				creator: null,
				effect: 'Great force',
				hand: 'Flick wand',
				image: null,
				incantation: null,
				light: 'None',
				name: "Albus Dumbledore's forceful spell",
				wiki: "https://harrypotter.fandom.com/wiki/Albus_Dumbledore's_forceful_spell",
			},
			links: {
				self: '/v1/spells/fe351216-2b9b-49b2-bde0-b4c7b98cf125',
			},
		},
		{
			id: '973da5b1-eebd-4b33-9cf8-160a6fab1a43',
			attributes: {
				category: 'Charm',
				creator: null,
				effect: 'Loudens target',
				hand: 'Direct at target',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/2/29/Sonorous_GOF_Dumbledore_1.jpg',
				incantation: 'Sonorus(soh-NOHR-us)',
				light: 'None',
				name: 'Amplifying Charm',
				wiki: 'https://harrypotter.fandom.com/wiki/Amplifying_Charm',
			},
			links: {
				self: '/v1/spells/973da5b1-eebd-4b33-9cf8-160a6fab1a43',
			},
		},
		{
			id: '3fd4a6f5-20b8-4b3e-8af9-8ffc676e87c5',
			attributes: {
				category: 'Healing spell, Vanishment, Charm',
				creator: null,
				effect: "Cleared target's airway by vanishing blockages",
				hand: 'Point wand at target',
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/2/2e/Celestina_Warbeck%27s_throat_unblocked_HM.png',
				incantation: 'Anapneo(ah-NAP-nee-oh)',
				light: null,
				name: 'Anapneo',
				wiki: 'https://harrypotter.fandom.com/wiki/Anapneo',
			},
			links: {
				self: '/v1/spells/3fd4a6f5-20b8-4b3e-8af9-8ffc676e87c5',
			},
		},
	],
	meta: {
		pagination: {
			current: 1,
			next: 2,
			last: 32,
			records: 312,
		},
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-29T23:33:28.670+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/spells?page[number]=1\u0026page[size]=10\u0026',
		current:
			'https://api.potterdb.com/v1/spells?page[number]=1\u0026page[size]=10',
		next: 'https://api.potterdb.com/v1/spells?page[number]=2\u0026page[size]=10',
		last: 'https://api.potterdb.com/v1/spells?page[number]=32\u0026page[size]=10',
	},
})

export const getSpellsSuccessResponseHandler = http.get(
	`${BASE_API_URL}spells`,
	async info => {
		const url = new URL(info.request.url)
		const nameFilter = url.searchParams?.get('filter[name_cont]')

		let filteredSpells = makeSpellListResponse().data

		if (nameFilter) {
			filteredSpells = filteredSpells.filter(spell =>
				spell.attributes.name.toLowerCase().includes(nameFilter.toLowerCase()),
			)
		}

		return new Response(
			JSON.stringify({
				...makeSpellListResponse(),
				data: filteredSpells,
			}),
			{
				status: 200,
			},
		)
	},
)

export const getSpellsNullBodyResponseHandler = http.get(
	`${BASE_API_URL}spells`,
	async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	},
)

export const getSpellsEmptyResponseHandler = http.get(
	`${BASE_API_URL}spells`,
	async () => {
		return new Response(
			JSON.stringify({
				meta: makeSpellListResponse().meta,
				links: makeSpellListResponse().links,
				data: [],
			}),
			{
				status: 200,
			},
		)
	},
)

export const getSpellsErrorResponseHandler = http.get(
	`${BASE_API_URL}spells`,
	async () => {
		return new Response(null, {
			status: 500,
		})
	},
)
