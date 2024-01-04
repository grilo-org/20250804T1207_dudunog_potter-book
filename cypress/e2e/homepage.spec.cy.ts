import { Book } from '@/entities/Book'
import { BookPropsMock } from '@/tests/mocks/book.mock'

describe('Homepage', () => {
	beforeEach(() => cy.visit(''))

	it('should present search results on search', () => {
		cy.getByTestId('homepage-search-field').type('Harry Potter')

		cy.getByTestId('homepage-search-results').should('be.visible')
		cy.getByTestId('homepage-search-results')
			.find('a')
			.should('have.length', 16)
	})

	it('should navigate to details page when click on search result item', () => {
		const book = new Book({
			...BookPropsMock,
		})

		cy.getByTestId('homepage-search-field').type('Harry Potter')

		cy.getByTestId('homepage-search-results').find('a').first().click()

		cy.location('pathname').should('contain', `/books/${book.id}`)
	})

	it('should navigate to listing page when click on some resource item', () => {
		cy.getByTestId('book-listing-item').click()

		cy.location('pathname').should('contain', `/books`)
	})
})
