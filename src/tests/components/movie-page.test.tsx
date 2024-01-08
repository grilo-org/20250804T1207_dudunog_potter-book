import { useGetMovie } from '@/app/movies/hooks/use-get-movie'
import Movie from '@/app/movies/[id]/page'
import { server } from '@/setup-tests'
import { resetMockRouter, wrapper } from '@/tests/utils'
import {
	getMovieNotFoundResponseHandler,
	getMovieSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

vitest.mock('next/navigation', () => ({
	useParams() {
		return {
			id: '6c2ba173-85e8-4708-8c1a-30620e14294a',
		}
	},
}))

const makeSut = (handler: HttpHandler, movieId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetMovie({
				id: movieId,
			}),
		{ wrapper },
	)

	render(<Movie />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('movie-page component', () => {
	afterEach(() =>
		resetMockRouter('/movies/6c2ba173-85e8-4708-8c1a-30620e14294a'),
	)

	test('renders skeleton when loading or fetching', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieSuccessResponseHandler(movieId), movieId)

		const skeleton = screen.getByTestId('movie-details-skeleton')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeleton).toBeInTheDocument()
	})

	test('should renders movie details correctly', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieSuccessResponseHandler(movieId), movieId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const movieDetails = screen.getByTestId('movie-details')

			expect(movieDetails).toBeInTheDocument()
		})
	})

	test('should renders no found movie message when movie was not found', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(
			getMovieNotFoundResponseHandler(movieId),
			movieId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const notFoundMovieMessage = screen.getByText('Nenhum filme encontrado')

			expect(notFoundMovieMessage).toBeInTheDocument()
		})
	})

	test('should return to movies listing page when click in back button', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const { result } = makeSut(getMovieSuccessResponseHandler(movieId), movieId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const backButton = screen.getByTestId('back-button')

			fireEvent.click(backButton)

			expect(mockRouter).toMatchObject({
				asPath: '/movies',
				pathname: '/movies',
			})
		})
	})
})
