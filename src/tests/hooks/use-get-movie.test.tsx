import { Movie } from '@/entities/Movie'
import { useGetMovie } from '@/app/movies/hooks/use-get-movie'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getMovieEmptyResponseHandler,
	getMovieErrorResponseHandler,
	getMovieSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler, movieId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetMovie({
				id: movieId,
			}),
		{ wrapper },
	)

	return {
		result,
	}
}

describe('use-get-movie hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieSuccessResponseHandler(movieId), movieId)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a movie', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieSuccessResponseHandler(movieId), movieId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.movie).toBeInstanceOf(Movie)
		})
	})

	test('should return null when the server returns no movie', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieEmptyResponseHandler(movieId), movieId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.movie).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieErrorResponseHandler(movieId), movieId)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
