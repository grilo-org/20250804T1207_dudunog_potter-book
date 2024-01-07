import Spells from '@/app/spells/page'
import { makeRouterSut, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'

const makeSut = () => {
	makeRouterSut()

	render(<Spells />, {
		wrapper,
	})

	return {}
}

describe('spells-page component', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(screen.getByText('Feitiços')).toBeInTheDocument()
	})

	test('should renders SpellsList', () => {
		makeSut()

		expect(screen.getByTestId('spells-list')).toBeInTheDocument()
	})
})
