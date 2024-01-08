import RootLayout from '@/app/layout'
import NotFound from '@/app/not-found'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { fireEvent, render, screen } from '@testing-library/react'

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
	render(<NotFound />, {
		wrapper: ({ children }) => (
			<RootLayout>
				<MemoryRouterProvider>{children}</MemoryRouterProvider>
			</RootLayout>
		),
	})

	return {}
}

describe('not-found page', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(screen.getByTestId('not-found-title')).toBeInTheDocument()
	})

	test('should go to home page when click in home page button', () => {
		makeSut()

		fireEvent.click(screen.getByTestId('home-page-button'))

		expect(mockRouter).toMatchObject({
			asPath: '/',
			pathname: '/',
		})
	})
})
