import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeCharacterResponse = () => ({
	data: {
		id: '70107ed4-9555-4d21-8fbc-c79bd90800ba',
		type: 'character',
		attributes: {
			slug: 'zola-farrell',
			alias_names: ['Farrell'],
			animagus: null,
			blood_status: 'Pure-blood',
			boggart: 'boggart test',
			born: 'Pre 1 September 1977',
			died: null,
			eye_color: 'Blue',
			family_members: [
				'Milo Farrell (husband)',
				'Kevin Farrell (son)',
				'Farrell family',
			],
			gender: 'Female',
			hair_color: 'Blonde',
			height: "6'1'",
			house: 'Gryffindor',
			image:
				'https://static.wikia.nocookie.net/harrypotter/images/a/a4/Zola_Farrell_MA_BBB.png',
			jobs: ['Chaser for the Holyhead Harpies'],
			marital_status: 'Married',
			name: 'Zola G. Farrell',
			nationality: 'British or Irish',
			patronus: 'test',
			romances: ['Milo Farrell (husband)'],
			skin_color: 'White',
			species: 'Human',
			titles: ['Chaser'],
			wands: ["12¼', Cedar, unicorn hair"],
			weight: '120 lbs',
			wiki: 'https://harrypotter.fandom.com/wiki/Aberforth_Dumbledore',
		},
		links: {
			self: '/v1/characters/f096911b-a140-4cee-96f3-0f92b6a56102',
		},
	},
	meta: {
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-30T06:09:41.859+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/characters/f096911b-a140-4cee-96f3-0f92b6a56102',
	},
})

export const getCharacterSuccessResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}characters/${id}`, async () => {
		return new Response(JSON.stringify(makeCharacterResponse()), {
			status: 200,
		})
	})

export const getCharacterEmptyResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}characters/${id}`, async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	})

export const getCharacterErrorResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}characters/${id}`, async () => {
		return new Response(null, {
			status: 500,
		})
	})

export const getCharacterNotFoundResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}characters/${id}`, async () => {
		return new Response(
			JSON.stringify({
				errors: [
					{
						status: '404',
						source: null,
						title: 'Not Found',
						detail: `Couldn't find Character with 'id'=${id}`,
					},
				],
			}),
			{
				status: 404,
			},
		)
	})
