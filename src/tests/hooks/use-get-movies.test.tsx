import { Movie } from '@/entities/Movie'
import { useGetMovies } from '@/shared/hooks/use-get-movies'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getMoviesNullBodyResponseHandler,
	getMoviesErrorResponseHandler,
	getMoviesSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(() => useGetMovies(), { wrapper })

	return {
		result,
	}
}

describe('use-get-movies hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const { result } = makeSut(getMoviesSuccessResponseHandler)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a list of movies', async () => {
		const { result } = makeSut(getMoviesSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(Array.isArray(result.current.movies)).toBeTruthy()
			expect(result.current.movies).toHaveLength(5)

			result.current.movies?.forEach(movie => {
				expect(movie).toBeInstanceOf(Movie)
			})
		})
	})

	test('should return null when the server returns no movies', async () => {
		const { result } = makeSut(getMoviesNullBodyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.movies).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getMoviesErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
