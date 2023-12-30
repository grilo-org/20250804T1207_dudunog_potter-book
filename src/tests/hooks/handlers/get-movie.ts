import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeMovieResponse = () => ({
	data: {
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
	meta: {
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-30T14:24:23.770+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/movies/6c2ba173-85e8-4708-8c1a-30620e14294a',
	},
})

export const getMovieSuccessResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}movies/${id}`, async () => {
		return new Response(JSON.stringify(makeMovieResponse()), {
			status: 200,
		})
	})

export const getMovieErrorResponseHandler = (id: string) =>
	http.get(`${BASE_API_URL}movies/${id}`, async () => {
		return new Response(null, {
			status: 500,
		})
	})
