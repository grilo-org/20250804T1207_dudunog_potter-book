import { Spell } from '@/entities/Spell'
import { SpellPropsMock } from '@/tests/mocks/spell.mock'

describe('Spells', () => {
	let firstPageItems

	beforeEach(() => cy.visit('/spells'))

	it('should present spells', () => {
		cy.getByTestId('spell-item').then(items => {
			firstPageItems = items.map((_, el) => Cypress.$(el).text()).get()
		})
		cy.getByTestId('spell-item').should('have.length', 10)
	})

	it('should navigate to details page when click on spell title', () => {
		const spell = new Spell({
			...SpellPropsMock,
		})

		cy.getByTestId('spell-item').first().find('a').first().click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('contain', `/spells/${spell.id}`)
	})

	it('should navigate to details page when click on spell image', () => {
		const spell = new Spell({
			...SpellPropsMock,
		})

		cy.getByTestId('spell-item').first().find('a').last().click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('contain', `/spells/${spell.id}`)
	})

	it('should change page when click on some page', () => {
		cy.getByTestId('pagination-item-2').click()

		cy.getByTestId('spell-item').should('have.length', 10)
		cy.getByTestId('spell-item').then(items => {
			const secondPageItems = items.map((_, el) => Cypress.$(el).text()).get()
			expect(secondPageItems).not.to.deep.equal(firstPageItems)
		})
	})
})
