import { server } from '@/setup-tests'
import { Movie } from '@/entities/Movie'
import { getMovie } from '.'
import {
	getMovieErrorResponseHandler,
	getMovieSuccessResponseHandler,
	makeMovieResponse,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-movie service', () => {
	test('should return a movie', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		const {
			data: {
				id,
				type,
				attributes: {
					box_office,
					music_composers,
					release_date,
					running_time,
					...rest
				},
			},
		} = makeMovieResponse()

		makeSut(getMovieSuccessResponseHandler(movieId))

		const movieResponse = await getMovie.execute({
			id: movieId,
		})

		expect(movieResponse).toBeInstanceOf(Movie)
		expect(movieResponse).toEqual(
			new Movie({
				...rest,
				id,
				type,
				boxOffice: box_office,
				musicComposers: music_composers,
				releaseDate: release_date,
				runningTime: running_time,
			}),
		)
	})

	test.fails("should fails when an id wasn't passed", async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		makeSut(getMovieSuccessResponseHandler(movieId))

		const movie = await getMovie.execute()

		expect(movie).toBeNull()
	})

	test.fails('should fails when the request fails', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		makeSut(getMovieErrorResponseHandler(movieId))

		const movie = await getMovie.execute({
			id: movieId,
		})

		expect(movie).toBeNull()
	})
})
