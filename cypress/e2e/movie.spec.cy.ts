import { Movie } from '@/entities/Movie'
import { MoviePropsMock } from '@/tests/mocks/movie.mock'

describe('Movie', () => {
	beforeEach(() => cy.visit('/movies/d5ebb9f5-d7d1-4e49-9b78-cbc92b9bc3b8'))

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
})
