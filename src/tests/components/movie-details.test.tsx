import { Movie } from '@/entities/Movie'
import { MovieDetails } from '@/app/movies/components/movie-details'
import { MoviePropsMock } from '@/tests/mocks/movie.mock'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialMovie?: Movie) => {
	makeRouterSut()

	const movie =
		initialMovie ??
		new Movie({
			...MoviePropsMock,
		})

	render(<MovieDetails movie={movie} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		movie,
	}
}

describe('movie-details component', () => {
	afterEach(() =>
		resetMockRouter('/movies/58e26658-e894-44be-9a5f-da9b524d02ad'),
	)

	test('renders movie details correctly', async () => {
		const { movie } = makeSut()

		expect(screen.getByText(String(movie?.title))).toBeInTheDocument()

		expect(screen.getByAltText('Movie image')).toBeInTheDocument()
		expect(screen.getByText(movie?.rating)).toBeInTheDocument()
		expect(screen.getByTestId('movie-trailer-iframe')).toBeInTheDocument()
		expect(screen.getByText(movie?.releaseDate)).toBeInTheDocument()
		expect(screen.getByText(movie?.runningTime)).toBeInTheDocument()
		expect(screen.getByText(movie?.boxOffice)).toBeInTheDocument()
		expect(screen.getByText(movie?.budget)).toBeInTheDocument()
		expect(screen.getByText(movie?.summary)).toBeInTheDocument()
	})

	test('should renders alternative image when movie image is not available', async () => {
		makeSut(
			new Movie({
				...MoviePropsMock,
				poster: '',
			}),
		)

		expect(screen.getByTestId('alternative-movie-image')).toBeInTheDocument()
	})
})
