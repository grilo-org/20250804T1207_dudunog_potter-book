import { useGetMovie } from '@/app/movies/hooks/use-get-movie'
import { MovieTabsList } from '@/app/movies/components/movie-tabs-list'
import { server } from '@/setup-tests'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { getMovieSuccessResponseHandler } from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

const makeSut = (handler?: HttpHandler) => {
	const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

	makeRouterSut()

	if (handler) {
		server.use(handler)
	}

	const { result } = renderHook(
		() =>
			useGetMovie({
				id: movieId,
			}),
		{ wrapper },
	)

	render(<MovieTabsList movieId={movieId} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('movie-tabs-list component', () => {
	afterEach(() =>
		resetMockRouter('/movies/6c2ba173-85e8-4708-8c1a-30620e14294a'),
	)

	test('should renders movie details correctly', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		makeSut(getMovieSuccessResponseHandler(movieId))

		expect(screen.getByTestId('movie-tabs')).toBeInTheDocument()
	})

	test('should change tab content when click in a tab', async () => {
		const movieId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		const wandsTabKey = 'screenwriters'

		const { result } = makeSut(getMovieSuccessResponseHandler(movieId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const lastTab = screen.getByTestId(`${wandsTabKey}-tab-item-header`)

			fireEvent.click(lastTab)

			expect(
				screen.getByTestId(`${wandsTabKey}-tab-item-content`),
			).toBeInTheDocument()
		})
	})
})
