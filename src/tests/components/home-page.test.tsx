import RootLayout from '@/app/layout'
import Home from '@/app/page'
import { render, screen } from '@testing-library/react'

vi.mock('next/font/google', () => ({
	Inter: () => ({
		style: {
			fontFamily: 'inter',
		},
	}),
}))

vi.mock('next/font/local', () => ({
	default: () => ({
		style: {
			fontFamily: 'harry',
		},
	}),
	style: {
		fontFamily: 'harry',
	},
}))

const makeSut = () => {
	render(<Home />, {
		wrapper: ({ children }) => <RootLayout>{children}</RootLayout>,
	})

	return {}
}

describe('home page', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(
			screen.getByText(
				'Palavras na minha não tão humilde opinião são nossa inesgotável fonte de magia.',
			),
		).toBeInTheDocument()
	})

	test('should renders SearchSection', () => {
		makeSut()

		expect(screen.getByTestId('homepage-search-field')).toBeInTheDocument()
	})
})
