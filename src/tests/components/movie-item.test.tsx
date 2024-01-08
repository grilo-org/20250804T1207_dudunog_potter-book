import { Movie } from '@/entities/Movie'
import { MovieItem } from '@/app/movies/components/movie-item'
import { MoviePropsMock } from '@/tests/mocks/movie.mock'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialMovie?: Movie) => {
	makeRouterSut()

	const movie =
		initialMovie ??
		new Movie({
			...MoviePropsMock,
		})

	render(<MovieItem movie={movie} />, {
		wrapper: MemoryRouterProvider,
	})

	return {
		movie,
	}
}

describe('movie-item component', () => {
	afterEach(() => resetMockRouter('/movies'))

	test('renders movie details correctly', async () => {
		const { movie } = makeSut()

		expect(screen.getByText(String(movie?.title))).toBeInTheDocument()

		expect(screen.getByAltText('Movie image')).toBeInTheDocument()
		expect(screen.getByText(movie?.rating)).toBeInTheDocument()
		expect(screen.getByText(movie?.releaseDate)).toBeInTheDocument()
		expect(screen.getByText(movie?.runningTime)).toBeInTheDocument()
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

	test('should redirect to movie details page when clicking on movie title', async () => {
		const { movie } = makeSut()

		const movieName = screen.getByText(String(movie?.title))

		fireEvent.click(movieName)

		expect(mockRouter).toMatchObject({
			asPath: `/movies/${movie.id}`,
			pathname: '/movies/[id]',
		})
	})

	test('should redirect to movie details page when clicking on movie image', async () => {
		const { movie } = makeSut()

		const movieImage = screen.getByAltText('Movie image')

		fireEvent.click(movieImage)

		mockRouter.reload()
		expect(mockRouter).toMatchObject({
			asPath: `/movies/${movie.id}`,
			pathname: '/movies/[id]',
		})
	})
})
