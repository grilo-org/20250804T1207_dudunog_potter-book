import { server } from '@/setup-tests'
import { getMovies } from '@/shared/services/get-movies'
import {
	moviesErrorResponseHandler,
	moviesSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-movies service', () => {
	test('should return a list of movies', async () => {
		makeSut(moviesSuccessResponseHandler)

		const movies = await getMovies.execute()

		expect(movies).toHaveLength(5)
	})

	test('should return a list of movies when filters was passed', async () => {
		makeSut(moviesSuccessResponseHandler)

		const movies = await getMovies.execute({
			name: 'Harry Potter and the Half-Blood Prince',
		})

		expect(movies).toHaveLength(5)
	})

	test.fails('should fails when the request fails', async () => {
		makeSut(moviesErrorResponseHandler)

		const movies = await getMovies.execute({
			name: 'Harry Potter',
		})

		expect(movies).toBeNull()
	})
})
