import Books from '@/app/books/page'
import { makeRouterSut, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'

const makeSut = () => {
	makeRouterSut()

	render(<Books />, {
		wrapper,
	})

	return {}
}

describe('books-page component', () => {
	test('should renders correctly', () => {
		makeSut()

		expect(screen.getByText('Livros')).toBeInTheDocument()
	})

	test('should renders BooksList', () => {
		makeSut()

		expect(screen.getByTestId('books-list')).toBeInTheDocument()
	})
})
