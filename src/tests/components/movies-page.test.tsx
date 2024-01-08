import Movies from '@/app/movies/page'
import { makeRouterSut, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'

const makeSut = () => {
	makeRouterSut()

	render(<Movies />, {
		wrapper,
	})

	return {}
}

describe('movies page', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(screen.getByText('Filmes')).toBeInTheDocument()
	})

	test('should renders MoviesList', () => {
		makeSut()

		expect(screen.getByTestId('movies-list')).toBeInTheDocument()
	})
})
