/// <reference types="cypress" />

Cypress.Commands.add(
	'getByTestId',
	(id, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) =>
		cy.get(`[data-testid=${id}]`, options),
)

declare namespace Cypress {
	interface Chainable {
		getByTestId(
			id: string,
			options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
		): Chainable<JQuery<HTMLElement>>
	}
}
