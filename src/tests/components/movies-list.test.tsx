import { useGetMovies } from '@/shared/hooks/use-get-movies'
import { MoviesList } from '@/app/movies/components/movies-list'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getMoviesEmptyResponseHandler,
	getMoviesErrorResponseHandler,
	getMoviesSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { render, renderHook, screen, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetMovies({
				name: '',
			}),
		{ wrapper },
	)

	render(<MoviesList />, {
		wrapper,
	})

	return {
		result,
	}
}

describe('movies-list component', () => {
	test('renders skeleton when loading or fetching', async () => {
		const { result } = makeSut(getMoviesSuccessResponseHandler)

		const skeletons = screen.getAllByTestId('movie-skeleton-item')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeletons).toHaveLength(6)
	})

	test('should renders movies list correctly', async () => {
		const { result } = makeSut(getMoviesSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const movieItems = screen.getAllByTestId('movie-item')
			expect(movieItems).toHaveLength(5)
		})
	})

	test('should renders no movies message when movies list is empty', async () => {
		const { result } = makeSut(getMoviesEmptyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const noMoviesMessage = screen.getByText(
				'Não há filmes para serem listados',
			)
			expect(noMoviesMessage).toBeInTheDocument()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getMoviesErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const error = screen.getByTestId('error')
			expect(error).toBeInTheDocument()
		})
	})
})
