import { Movie } from '@/entities/Movie'
import { MoviePropsMock } from '@/tests/mocks/movie.mock'

describe('Movie', () => {
	beforeEach(() => cy.visit('/movies/e80d5a37-620e-4be2-92b9-fb1f5262494f'))

	it('should present movie details', () => {
		cy.getByTestId('movie-details').should('exist')
	})

	it('should redirect to wiki when click on wiki button', () => {
		const movie = new Movie({
			...MoviePropsMock,
		})

		cy.origin(movie.wiki, () => {
			cy.on('uncaught:exception', e => {
				if (e.message.includes('Things went bad')) {
					cy.getByTestId('movie-details', {
						timeout: 10000,
					})
						.find('a')
						.first()
						.invoke('removeAttr', 'target')
						.click()

					cy.location('pathname', {
						timeout: 10000,
					}).should('contain', movie.wiki)
				}
			})
		})
	})

	it('should change tab content when click in a tab', () => {
		const screenwritersTabKey = 'screenwriters'

		cy.getByTestId(`${screenwritersTabKey}-tab-item-header`, {
			timeout: 10000,
		})
			.last()
			.click()

		cy.getByTestId(`${screenwritersTabKey}-tab-item-content`).should('exist')
	})

	it('should back to movies list when click in back button', () => {
		cy.getByTestId('back-button').click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('equal', '/movies')
	})
})
