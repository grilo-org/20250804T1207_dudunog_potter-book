import { Movie } from '@/entities/Movie'
import { MoviePropsMock } from '@/tests/mocks/movie.mock'

describe('Movies', () => {
	beforeEach(() => cy.visit('/movies'))

	it('should present movies', () => {
		cy.getByTestId('movie-item').should('have.length', 11)
	})

	it('should navigate to details page when click on movie title', () => {
		const movie = new Movie({
			...MoviePropsMock,
		})

		cy.getByTestId('movie-item').first().find('a').first().click()

		cy.location('pathname').should('contain', `/movies/${movie.id}`)
	})

	it('should navigate to details page when click on book image', () => {
		const movie = new Movie({
			...MoviePropsMock,
		})

		cy.getByTestId('movie-item').first().find('a').last().click()

		cy.location('pathname').should('contain', `/movies/${movie.id}`)
	})
})
