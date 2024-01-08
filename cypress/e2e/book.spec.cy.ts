import { Book } from '@/entities/Book'
import { BookPropsMock } from '@/tests/mocks/book.mock'

describe('Book', () => {
	beforeEach(() => cy.visit('/books/99015cdb-bf16-4042-863a-b25b41b004f2'))

	it('should present book details', () => {
		cy.getByTestId('book-details').should('exist')
	})

	it('should redirect to wiki when click on wiki button', () => {
		const book = new Book({
			...BookPropsMock,
		})

		cy.origin(book.wiki, () => {
			cy.on('uncaught:exception', e => {
				if (e.message.includes('Things went bad')) {
					cy.getByTestId('book-details', {
						timeout: 10000,
					})
						.find('a')
						.first()
						.invoke('removeAttr', 'target')
						.click()

					cy.location('pathname', {
						timeout: 10000,
					}).should('contain', book.wiki)
				}
			})
		})
	})

	it('should open the accordion when click in some book chapter', () => {
		cy.getByTestId('chapter-accordion-content').should('not.exist')

		cy.getByTestId('chapter-accordion-title', {
			timeout: 10000,
		})
			.first()
			.click()

		cy.getByTestId('chapter-accordion-content', {
			timeout: 10000,
		}).should('exist')
	})

	it('should back to books list when click in back button', () => {
		cy.getByTestId('back-button').click()

		cy.location('pathname').should('equal', '/books')
	})
})
