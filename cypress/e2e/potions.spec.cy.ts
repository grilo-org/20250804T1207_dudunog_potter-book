import { Potion } from '@/entities/Potion'
import { PotionPropsMock } from '@/tests/mocks/potion.mock'

describe('Potions', () => {
	let firstPageItems

	beforeEach(() => cy.visit('/potions'))

	it('should present potions', () => {
		cy.getByTestId('potion-item').then(items => {
			firstPageItems = items.map((_, el) => Cypress.$(el).text()).get()
		})
		cy.getByTestId('potion-item').should('have.length', 10)
	})

	it('should navigate to details page when click on potion title', () => {
		const potion = new Potion({
			...PotionPropsMock,
		})

		cy.getByTestId('potion-item').first().find('a').first().click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('contain', `/potions/${potion.id}`)
	})

	it('should navigate to details page when click on potion image', () => {
		const potion = new Potion({
			...PotionPropsMock,
		})

		cy.getByTestId('potion-item').first().find('a').last().click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('contain', `/potions/${potion.id}`)
	})

	it('should change page when click on some page', () => {
		cy.getByTestId('pagination-item-2').click()

		cy.getByTestId('potion-item').should('have.length', 10)
		cy.getByTestId('potion-item').then(items => {
			const secondPageItems = items.map((_, el) => Cypress.$(el).text()).get()
			expect(secondPageItems).not.to.deep.equal(firstPageItems)
		})
	})
})
