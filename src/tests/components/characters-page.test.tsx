import Characters from '@/app/characters/page'
import { makeRouterSut, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'

const makeSut = () => {
	makeRouterSut()

	render(<Characters />, {
		wrapper,
	})

	return {}
}

describe('characters-page component', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(screen.getByText('Personagens')).toBeInTheDocument()
	})

	test('should renders CharactersList', () => {
		makeSut()

		expect(screen.getByTestId('characters-list')).toBeInTheDocument()
	})
})
