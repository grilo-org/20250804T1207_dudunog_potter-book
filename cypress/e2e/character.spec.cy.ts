import { Character } from '@/entities/Character'
import { CharacterPropsMock } from '@/tests/mocks/character.mock'

describe('Character', () => {
	beforeEach(() => cy.visit('/characters/70107ed4-9555-4d21-8fbc-c79bd90800ba'))

	it('should present character details', () => {
		cy.getByTestId('character-details').should('exist')
	})

	it('should redirect to wiki when click on wiki button', () => {
		const character = new Character({
			...CharacterPropsMock,
		})

		cy.origin(character.wiki, () => {
			cy.on('uncaught:exception', e => {
				if (e.message.includes('Things went bad')) {
					cy.getByTestId('character-details', {
						timeout: 10000,
					})
						.find('a')
						.first()
						.invoke('removeAttr', 'target')
						.click()

					cy.location('pathname', {
						timeout: 10000,
					}).should('contain', character.wiki)
				}
			})
		})
	})

	it('should change tab content when click in a tab', () => {
		const wandsTabKey = 'wands'

		cy.getByTestId(`${wandsTabKey}-tab-item-header`, {
			timeout: 10000,
		})
			.last()
			.click()

		cy.getByTestId(`${wandsTabKey}-tab-item-content`).should('exist')
	})
})
