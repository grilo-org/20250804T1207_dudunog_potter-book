import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeBookChaptersResponse = () => ({
	data: [
		{
			id: 'a5b54618-9282-4cc0-a881-c71a3f70aae6',
			type: 'chapter',
			attributes: {
				slug: 'the-boy-who-lived',
				order: 1,
				summary:
					"In the first chapter, we are introduced the Dursley family: Mr. and Mrs. Dursley and his son Dudley. They live on Privet Drive number four and are proud of being completely normal. One day, Mr. Dursley notices many strange things: people wearing odd-looking colorful robes and talking about 'You-Know-Who', a peculiar cat, as well as strangers who hug him and tell him to celebrate. That night, Professor Dumbledore, Professor McGonagall and Rubeus Hagrid meet in Privet Drive. They discuss the tragic deaths of James and Lily Potter and the survival of their son Harry. The chapter ends with them leaving the baby on the Dursleys' doorstep with a letter explaining the circumstances.",
				title: 'The Boy Who Lived',
			},
			relationships: {
				book: {
					data: {
						id: '99015cdb-bf16-4042-863a-b25b41b004f2',
						type: 'book',
					},
				},
			},
			links: {
				self: '/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters/a5b54618-9282-4cc0-a881-c71a3f70aae6',
			},
		},
		{
			id: 'df76f6dd-6daf-45f9-a071-df6acb59ed92',
			type: 'chapter',
			attributes: {
				slug: 'the-vanishing-glass',
				order: 2,
				summary:
					"Many years later, Harry Potter is already 10 years old and still living with the Dursley family. They give a roof over his head, but overall they treat him more like a help than a family member. On the day of Dudley's birthday, the Dursleys want to visit the zoo and due to an unfortunate coincidence, they have to bring along Harry. The boy gets drawn into a conversation with a boa constrictor. When Dudley starts teasing Harry, the glass in front of the boa disappears. The snake escapes its terrarium, thanking Harry for the help, and spreads panic across visitors, Dursleys included.",
				title: 'The Vanishing Glass',
			},
			relationships: {
				book: {
					data: {
						id: '99015cdb-bf16-4042-863a-b25b41b004f2',
						type: 'book',
					},
				},
			},
			links: {
				self: '/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters/df76f6dd-6daf-45f9-a071-df6acb59ed92',
			},
		},
		{
			id: 'f0944f8a-bc9c-40d1-94fc-aa7cb894ae6f',
			type: 'chapter',
			attributes: {
				slug: 'the-letter-from-no-one',
				order: 3,
				summary:
					"It's the summer holiday before Harry and Dudley go to different schools - Harry's local school and Dudley's expensive private school. One morning during breakfast, the mail arrives at Dursley's home. Unexpectedly, there is a first-ever, strange looking letter to Harry. However the Dursleys don't allow Harry to read his letter and the next day more letters get into the house by all means, no matter how hard Dursleys try to get rid of them. Uncle Vernon decides to run away from the problem and takes the whole family to a hotel, but the letters are still following them. Finally, they end up in an old cabin on an island which can only be accessed by a boat, hoping to no longer get any letters. In the night, while Harry is counting the seconds till his 11th birthday, suddenly someone is hammering on the cabin's door.",
				title: 'The Letter from No One',
			},
			relationships: {
				book: {
					data: {
						id: '99015cdb-bf16-4042-863a-b25b41b004f2',
						type: 'book',
					},
				},
			},
			links: {
				self: '/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters/f0944f8a-bc9c-40d1-94fc-aa7cb894ae6f',
			},
		},
		{
			id: '68238c83-8f07-4274-bbfd-83cae1621029',
			type: 'chapter',
			attributes: {
				slug: 'the-keeper-of-the-keys',
				order: 4,
				summary:
					"The person hammering on the door enters the cabin and introduces himself as Hagrid, the Keeper of the Keys in Hogwarts School of Witchcraft and Wizardry. He is a half-giant and a friend of Harry's parents, Lily and James. Hagrid informs Harry about his magical heritage, reveals his true identity as a wizard, and explains that he is to attend Hogwarts. Hagrid's arrival marks the beginning of Harry's journey into the wizarding world, his introduction to the magical community and his newfound destiny.",
				title: 'The Keeper of the Keys',
			},
			relationships: {
				book: {
					data: {
						id: '99015cdb-bf16-4042-863a-b25b41b004f2',
						type: 'book',
					},
				},
			},
			links: {
				self: '/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters/68238c83-8f07-4274-bbfd-83cae1621029',
			},
		},
		{
			id: '62f13f51-883d-454d-b4ca-7dd9f4958444',
			type: 'chapter',
			attributes: {
				slug: 'diagon-alley',
				order: 5,
				summary:
					"Hagrid takes Harry to the Leaky Cauldron, a wizarding inn, and then through a secret entrance in Leaky Cauldron's back wall to Diagon Alley. There Harry experiences a whole new world, visiting Gringotts to access his family vault, purchasing his school supplies and receiving his very own wand from Ollivanders. Additionally, Harry acquires Hedwig, a beautiful snowy owl, as a gift from Hagrid. It's a captivating introduction to the magical realm he's destined to be a part of.",
				title: 'Diagon Alley',
			},
			relationships: {
				book: {
					data: {
						id: '99015cdb-bf16-4042-863a-b25b41b004f2',
						type: 'book',
					},
				},
			},
			links: {
				self: '/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters/62f13f51-883d-454d-b4ca-7dd9f4958444',
			},
		},
	],
	meta: {
		pagination: {
			current: 1,
			records: 17,
		},
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-30T05:51:49.884+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters',
		current:
			'https://api.potterdb.com/v1/books/99015cdb-bf16-4042-863a-b25b41b004f2/chapters?page[number]=1',
	},
})

export const getBookChaptersSuccessResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}books/${id}/chapters`, async () => {
		return new Response(JSON.stringify(makeBookChaptersResponse()), {
			status: 200,
		})
	})

export const getBookChaptersEmptyResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}books/${id}/chapters`, async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	})

export const getBookChaptersErrorResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}books/${id}/chapters`, async () => {
		return new Response(null, {
			status: 500,
		})
	})
