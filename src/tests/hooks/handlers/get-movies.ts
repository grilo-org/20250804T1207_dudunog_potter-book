import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeMovieListResponse = () => ({
	data: [
		{
			id: '58e26658-e894-44be-9a5f-da9b524d02ad',
			type: 'movie',
			attributes: {
				slug: 'harry-potter-and-the-philosopher-s-stone',
				box_office: '$1.018 million',
				budget: '$125 million',
				cinematographers: ['John Seale'],
				directors: ['Chris Columbus'],
				distributors: ['Warner Bros. Pictures'],
				editors: ['Richard Francis-Bruce'],
				music_composers: ['John Williams', 'Conrad Pope'],
				poster:
					'https://www.wizardingworld.com/images/products/films/rectangle-1.png',
				producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
				rating: 'PG',
				release_date: '2001-11-04',
				running_time: '152 minutes',
				screenwriters: ['Steve Kloves'],
				summary:
					'Harry Potter’s dull life is completely changed on his eleventh birthday when a mysterious letter addressed to him arrives in the mail. After finding out about his real parents and a whole hidden wizarding world, he goes on to Hogwarts, his new magical school. From battling a troll to flying on broomsticks to catch golden snitches, Harry’s new life promises to be full of joy and adventure, until he finds out about a certain Dark Lord who murdered his parents is trying to regain power. With his friends Hermione and Ron, Harry sets out to find the philosopher’s stone before Voldemort to prevent his return. After advancing through a particularly difficult set of traps designed by the school, Harry faces the Dark Lord and manages to keep the Philosopher’s Stone safe.',
				title: "Harry Potter and the Philosopher's Stone",
				trailer: 'https://www.youtube.com/watch?v=PbdM1db3JbY',
				wiki: "https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Philosopher's_Stone_(film)",
			},
			links: {
				self: '/v1/movies/58e26658-e894-44be-9a5f-da9b524d02ad',
			},
		},
		{
			id: '6c2ba173-85e8-4708-8c1a-30620e14294a',
			type: 'movie',
			attributes: {
				slug: 'harry-potter-and-the-chamber-of-secrets',
				box_office: '$879.6 million',
				budget: '$125 million',
				cinematographers: ['Roger Pratt'],
				directors: ['Chris Columbus'],
				distributors: ['Warner Bros. Pictures'],
				editors: ['Peter Honess'],
				music_composers: ['John Williams', 'William Ross', 'Conrad Pope'],
				poster:
					'https://www.wizardingworld.com/images/products/films/rectangle-2.png',
				producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
				rating: 'PG',
				release_date: '2002-11-15',
				running_time: '161 minutes',
				screenwriters: ['Steve Kloves'],
				summary:
					"Harry's second year at Hogwarts begins with a series of mishaps when he and Ron miss the train to Hogwarts. Furthermore, a mysterious Chamber of Secrets has been opened inside Hogwarts and students are getting petrified one after the another. Harry, Ron and Hermione start to uncover the dark tale behind the chamber using a diary Harry found, which leads them into the lair of an Acromantula. Ginny gets kidnapped and it is up to Harry to save her and the school from the monster of the Chamber of Secrets.",
				title: 'Harry Potter and the Chamber of Secrets',
				trailer: 'https://www.youtube.com/watch?v=2lSpGlsZtk0',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Chamber_of_Secrets_(film)',
			},
			links: {
				self: '/v1/movies/6c2ba173-85e8-4708-8c1a-30620e14294a',
			},
		},
		{
			id: '2dc416cf-7fa3-449c-93f0-76c478085d33',
			type: 'movie',
			attributes: {
				slug: 'harry-potter-and-the-prisoner-of-azkaban',
				box_office: '$797.4 million',
				budget: '$130 million',
				cinematographers: ['Michael Seresin'],
				directors: ['Alfonso Cuarón'],
				distributors: ['Warner Bros. Pictures'],
				editors: ['Steven Weisberg'],
				music_composers: ['John Williams', 'Conrad Pope'],
				poster:
					'https://www.wizardingworld.com/images/products/films/rectangle-3.png',
				producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
				rating: 'PG',
				release_date: '2002-11-15',
				running_time: '142 minutes',
				screenwriters: ['Steve Kloves'],
				summary:
					' After unintentionally using magic against Aunt Marge, Harry arrives at the Leaky Cauldron and learns that a killer named Sirius Black is after him. Hogwarts is under a dark and grim spell with Dementors, the ghostly guardians of Azkaban, looking for Black. Harry and his friends spend their third year learning how to handle a half-horse half-eagle Hippogriff, repel shape-shifting Boggarts and master the art of Divination. Harry also inherits a strange map and finds out the truth about Sirius Black being his godfather. Battling against dementors and werewolves, an incredible story unfolds as Harry masters advanced magic, crosses the barriers of time and changes the course of more than one life.',
				title: 'Harry Potter and the Prisoner of Azkaban',
				trailer: 'https://www.youtube.com/watch?v=1ZdlAg3j8nI',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Prisoner_of_Azkaban_(film)',
			},
			links: {
				self: '/v1/movies/2dc416cf-7fa3-449c-93f0-76c478085d33',
			},
		},
		{
			id: 'd5ebb9f5-d7d1-4e49-9b78-cbc92b9bc3b8',
			type: 'movie',
			attributes: {
				slug: 'harry-potter-and-the-goblet-of-fire',
				box_office: '$896.7 million',
				budget: '$150 million',
				cinematographers: ['Roger Pratt'],
				directors: ['Mike Newell'],
				distributors: ['Warner Bros. Pictures'],
				editors: ['Mick Audsley'],
				music_composers: ['Patrick Doyle'],
				poster:
					'https://www.wizardingworld.com/images/products/films/rectangle-4.png',
				producers: ['David Heyman'],
				rating: 'PG-13',
				release_date: '2005-11-06',
				running_time: '157 minutes',
				screenwriters: ['Steve Kloves'],
				summary:
					'In his fourth year at Hogwarts, Harry is mysteriously selected as a champion for the Triwizard Tournament. Three dangerous tasks await the champions from different schools, each tougher than the next. With the help of his new Defence Against the Dark Arts teacher, Professor Moody, Harry manages to advance through dragons, water demons and enchanted mazes to find himself in the clutches of Lord Voldemort. With the return of the Dark Lord and the Ministry denying Harry’s claims, will things ever return to how they were?',
				title: 'Harry Potter and the Goblet of Fire',
				trailer: 'https://www.youtube.com/watch?v=PFWAOnvMd1Q',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Goblet_of_Fire_(film)',
			},
			links: {
				self: '/v1/movies/d5ebb9f5-d7d1-4e49-9b78-cbc92b9bc3b8',
			},
		},
		{
			id: 'fc8f79e9-216d-4362-9377-9f19da4b7ae8',
			type: 'movie',
			attributes: {
				slug: 'harry-potter-and-the-order-of-the-phoenix',
				box_office: '$942.2 million',
				budget: '$150-200 million',
				cinematographers: ['Sławomir Idziak'],
				directors: ['David Yates'],
				distributors: ['Warner Bros. Pictures'],
				editors: ['Mark Day'],
				music_composers: ['Nicholas Hooper'],
				poster:
					'https://www.wizardingworld.com/images/products/films/rectangle-5.png',
				producers: ['David Heyman', 'David Barron'],
				rating: 'PG-13',
				release_date: '2007-07-11',
				running_time: '138 minutes',
				screenwriters: ['Michael Goldenberg'],
				summary:
					'Harry’s fifth year at Hogwarts is no short of trouble when a new Defence Against the Dark Arts teacher, Dolores Umbridge, is appointed by the ministry of magic. Umbridge refuses to teach any actual defensive spells, causing Harry to form a secret group of students called “Dumbledore’s Army” to learn and teach defensive spells. The connection between Harry and Voldemort’s mind grows stronger, and a concerned Dumbledore asks Snape to teach Occlumency to Harry. Harry experiences a surge of romantic feelings for someone. Things only get worse as Dumbledore’s Army is discovered and Umbridge is appointed as the new Headmistress. As Voldemort grows in power and the danger grows ever more, Harry might lose someone very close to him.',
				title: 'Harry Potter and the Order of the Phoenix',
				trailer: 'https://www.youtube.com/watch?v=47PHbQTmw5g',
				wiki: 'https://harrypotter.fandom.com/wiki/Harry_Potter_and_the_Order_of_the_Phoenix_(film)',
			},
			links: {
				self: '/v1/movies/fc8f79e9-216d-4362-9377-9f19da4b7ae8',
			},
		},
	],
	meta: {
		pagination: {
			current: 1,
			records: 11,
		},
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-29T22:53:31.139+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/movies',
		current: 'https://api.potterdb.com/v1/movies?page[number]=1',
	},
})

export const getMoviesSuccessResponseHandler = http.get(
	`${BASE_API_URL}movies`,
	async () => {
		return new Response(JSON.stringify(makeMovieListResponse()), {
			status: 200,
		})
	},
)

export const getMoviesEmptyResponseHandler = http.get(
	`${BASE_API_URL}movies`,
	async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	},
)

export const getMoviesErrorResponseHandler = http.get(
	`${BASE_API_URL}movies`,
	async () => {
		return new Response(null, {
			status: 500,
		})
	},
)
