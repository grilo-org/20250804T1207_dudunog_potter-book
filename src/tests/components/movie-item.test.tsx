import { Movie } from '@/entities/Movie'
import { MovieItem } from '@/app/movies/components/movie-item'
import { makeMovieResponse } from '@/tests/hooks/handlers'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

const makeSut = (initialMovie?: Movie) => {
	makeRouterSut()

	const {
		data: { attributes, ...baseMovie },
	} = makeMovieResponse()

	const movie =
		initialMovie ??
		new Movie({
			...baseMovie,
			...attributes,
			boxOffice: attributes.box_office,
			musicComposers: attributes.music_composers,
			releaseDate: attributes.release_date,
			runningTime: attributes.running_time,
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
		const {
			data: { attributes, ...baseMovie },
		} = makeMovieResponse()

		makeSut(
			new Movie({
				...baseMovie,
				...attributes,
				boxOffice: attributes.box_office,
				musicComposers: attributes.music_composers,
				releaseDate: attributes.release_date,
				runningTime: attributes.running_time,
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
