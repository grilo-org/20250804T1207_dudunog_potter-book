import Potions from '@/app/potions/page'
import { makeRouterSut, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'

const makeSut = () => {
	makeRouterSut()

	render(<Potions />, {
		wrapper,
	})

	return {}
}

describe('potions-page component', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(screen.getByText('Poções')).toBeInTheDocument()
	})

	test('should renders PotionsList', () => {
		makeSut()

		expect(screen.getByTestId('potions-list')).toBeInTheDocument()
	})
})
