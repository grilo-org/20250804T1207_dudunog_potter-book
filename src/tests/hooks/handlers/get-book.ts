import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeBookResponse = () => ({
	data: {
		id: '99015cdb-bf16-4042-863a-b25b41b004f2',
		type: 'book',
		attributes: {
			slug: 'harry-potter-and-the-philosopher-s-stone',
			author: 'J. K. Rowling',
			cover:
				'https://www.wizardingworld.com/images/products/books/UK/rectangle-1.jpg',
			dedication:
				'For Jessica, who loves stories, for Anne, who loved them too, and for Di, who heard this one first',
			pages: 223,
			release_date: '1997-06-26',
			summary:
				"Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
			title: "Harry Potter and the Philosopher's Stone",
			wiki: "https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Philosopher's_Stone",
		},
		relationships: {
			chapters: {
				data: [
					{
						id: 'a5b54618-9282-4cc0-a881-c71a3f70aae6',
						type: 'chapter',
					},
				],
			},
		},
		links: {
			self: '/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2',
		},
	},
	meta: {
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-30T01:05:44.317+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2',
	},
})

export const getBookSuccessResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}books/${id}`, async () => {
		return new Response(JSON.stringify(makeBookResponse()), {
			status: 200,
		})
	})

export const getBookErrorResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}books/${id}`, async () => {
		return new Response(null, {
			status: 500,
		})
	})
