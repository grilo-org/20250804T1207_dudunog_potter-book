import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeBookListResponse = () => ({
	data: [
		{
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
		{
			id: '35bc68ec-1ea1-40a9-a511-2d80f5dc7c71',
			type: 'book',
			attributes: {
				slug: 'harry-potter-and-the-chamber-of-secrets',
				author: 'J. K. Rowling',
				cover:
					'https://www.wizardingworld.com/images/products/books/UK/rectangle-2.jpg',
				dedication:
					'For Séan P. F. Harris, getaway driver and foul-weather friend',
				pages: 251,
				release_date: '1998-07-02',
				summary:
					"Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft And Wizardry for his second year, Harry hears strange whispers echo through empty corridors – and then the attacks start. Students are found as though turned to stone... Dobby's sinister predictions seem to be coming true.",
				title: 'Harry Potter and the Chamber of Secrets',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Chamber_of_Secrets',
			},
			relationships: {
				chapters: {
					data: [
						{
							id: 'ff3d528b-7271-4924-813b-d22cf6b0b161',
							type: 'chapter',
						},
					],
				},
			},
			links: {
				self: '/v1/books/35bc68ec-1ea1-40a9-a511-2d80f5dc7c71',
			},
		},
		{
			id: '2734666a-f4d3-4831-84fc-562648441ab1',
			type: 'book',
			attributes: {
				slug: 'harry-potter-and-the-prisoner-of-azkaban',
				author: 'J. K. Rowling',
				cover:
					'https://www.wizardingworld.com/images/products/books/UK/rectangle-3.jpg',
				dedication: 'To Jill Prewett and Aine Kiely, the Godmothers of Swing',
				pages: 317,
				release_date: '1999-07-08',
				summary:
					"When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run – and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss.",
				title: 'Harry Potter and the Prisoner of Azkaban',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Prisoner_of_Azkaban',
			},
			relationships: {
				chapters: {
					data: [
						{
							id: 'c3a917ae-cb6b-46fa-ada9-9fd5db360b7f',
							type: 'chapter',
						},
					],
				},
			},
			links: {
				self: '/v1/books/2734666a-f4d3-4831-84fc-562648441ab1',
			},
		},
		{
			id: 'c8bde67b-7c62-48d4-9c7f-4987c41df86f',
			type: 'book',
			attributes: {
				slug: 'harry-potter-and-the-goblet-of-fire',
				author: 'J. K. Rowling',
				cover:
					'https://www.wizardingworld.com/images/products/books/UK/rectangle-4.jpg',
				dedication:
					'To Peter Rowling, in memory of Mr Ridley and to Susan Sladden, who helped Harry out of his cupboard',
				pages: 636,
				release_date: '2000-07-08',
				summary:
					"The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter – but that doesn't stop Harry dreaming that he will win the competition. Then at Hallowe'en, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons and Dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through – alive!",
				title: 'Harry Potter and the Goblet of Fire',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Goblet_of_Fire',
			},
			relationships: {
				chapters: {
					data: [
						{
							id: 'cb21d978-f389-4f32-aec9-98f19f734e6a',
							type: 'chapter',
						},
					],
				},
			},
			links: {
				self: '/v1/books/c8bde67b-7c62-48d4-9c7f-4987c41df86f',
			},
		},
		{
			id: '2b9aab25-5ad3-4897-8187-7c5b6d2c4df6',
			type: 'book',
			attributes: {
				slug: 'harry-potter-and-the-order-of-the-phoenix',
				author: 'J. K. Rowling',
				cover:
					'https://www.wizardingworld.com/images/products/books/UK/rectangle-5.jpg',
				dedication: 'To Neil, Jessica and David, who make my world magical',
				pages: 766,
				release_date: '2003-06-21',
				summary:
					"Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, but Harry is not alone: a secret Order gathers at Grimmauld Place to fight against the Dark forces. Harry must allow Professor Snape to teach him how to protect himself from Voldemort's savage assaults on his mind. But they are growing stronger by the day and Harry is running out of time.",
				title: 'Harry Potter and the Order of the Phoenix',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Order_of_the_Phoenix',
			},
			relationships: {
				chapters: {
					data: [
						{
							id: '24a4f960-651e-468b-9712-774d23da64e8',
							type: 'chapter',
						},
					],
				},
			},
			links: {
				self: '/v1/books/2b9aab25-5ad3-4897-8187-7c5b6d2c4df6',
			},
		},
	],
	meta: {
		pagination: {
			current: 1,
			records: 5,
		},
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-29T16:00:04.372+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/books',
		current: 'https://api.potterdb.com/v1/books?page[number]=1',
	},
})

export const booksSuccessResponseHandler = http.get(
	`${BASE_API_URL}books`,
	async () => {
		return new Response(JSON.stringify(makeBookListResponse()), {
			status: 200,
		})
	},
)

export const booksErrorResponseHandler = http.get(
	`${BASE_API_URL}books`,
	async () => {
		return new Response(null, {
			status: 500,
		})
	},
)
