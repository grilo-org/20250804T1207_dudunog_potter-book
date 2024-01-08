import { Book } from '@/entities/Book'
import { BookPropsMock } from '@/tests/mocks/book.mock'

describe('Books', () => {
	beforeEach(() => cy.visit('/books'))

	it('should present books', () => {
		cy.getByTestId('book-item').should('have.length', 7)
	})

	it('should navigate to details page when click on book title', () => {
		const book = new Book({
			...BookPropsMock,
		})

		cy.getByTestId('book-item').first().find('a').first().click()

		cy.location('pathname').should('contain', `/books/${book.id}`)
	})

	it('should navigate to details page when click on book image', () => {
		const book = new Book({
			...BookPropsMock,
		})

		cy.getByTestId('book-item').first().find('a').last().click()

		cy.location('pathname').should('contain', `/books/${book.id}`)
	})
})
