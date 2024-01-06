import { Book } from '@/entities/Book'
import { BookDetails } from '@/app/books/components/book-details'
import { BookPropsMock } from '@/tests/mocks/book.mock'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialBook?: Book) => {
	makeRouterSut()

	const book =
		initialBook ??
		new Book({
			...BookPropsMock,
		})

	render(<BookDetails book={book} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		book,
	}
}

describe('book-details component', () => {
	afterEach(() =>
		resetMockRouter('/books/99015cdb-bf16-4042-863a-b25b41b004f2'),
	)

	test('renders book details correctly', async () => {
		const { book } = makeSut()

		expect(screen.getByText(String(book?.title))).toBeInTheDocument()

		expect(screen.getByAltText('Book image')).toBeInTheDocument()
		expect(screen.getByText(`${book?.pages} páginas`)).toBeInTheDocument()
		expect(
			screen.getByText(`${String(book?.pages)} páginas`),
		).toBeInTheDocument()
		expect(screen.getByText(String(book?.author))).toBeInTheDocument()
		expect(screen.getByText(String(book?.releaseDate))).toBeInTheDocument()
		expect(screen.getByText(String(book?.dedication))).toBeInTheDocument()
	})

	test('should renders alternative image when book image is not available', async () => {
		makeSut(
			new Book({
				...BookPropsMock,
				cover: '',
			}),
		)

		expect(screen.getByTestId('alternative-book-image')).toBeInTheDocument()
	})
})
