import { Character } from '@/entities/Character'
import { CharacterPropsMock } from '@/tests/mocks/character.mock'

describe('Characters', () => {
	let firstPageItems

	beforeEach(() => cy.visit('/characters'))

	it('should present characters', () => {
		cy.getByTestId('character-item').then(items => {
			firstPageItems = items.map((_, el) => Cypress.$(el).text()).get()
		})
		cy.getByTestId('character-item').should('have.length', 10)
	})

	it('should navigate to details page when click on character title', () => {
		const character = new Character({
			...CharacterPropsMock,
		})

		cy.getByTestId('character-item').first().find('a').first().click()

		cy.location('pathname').should('contain', `/characters/${character.id}`)
	})

	it('should navigate to details page when click on character image', () => {
		const character = new Character({
			...CharacterPropsMock,
		})

		cy.getByTestId('character-item').first().find('a').last().click()

		cy.location('pathname').should('contain', `/characters/${character.id}`)
	})

	it('should change page when click on some page', () => {
		console.log('firstPageItems:', firstPageItems)

		cy.getByTestId('pagination-item-2').click()

		cy.getByTestId('character-item').should('have.length', 10)
		cy.getByTestId('character-item').then(items => {
			const secondPageItems = items.map((_, el) => Cypress.$(el).text()).get()
			expect(secondPageItems).not.to.deep.equal(firstPageItems)
		})
	})
})
