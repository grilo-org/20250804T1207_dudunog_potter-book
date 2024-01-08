import { Book } from '@/entities/Book'
import { BookItem } from '@/app/books/components/book-item'
import { BookPropsMock } from '@/tests/mocks/book.mock'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialBook?: Book) => {
	makeRouterSut()

	const book =
		initialBook ??
		new Book({
			...BookPropsMock,
		})

	render(<BookItem book={book} />, {
		wrapper: MemoryRouterProvider,
	})

	return {
		book,
	}
}

describe('book-item component', () => {
	afterEach(() => resetMockRouter('/books'))

	test('renders book details correctly', async () => {
		const { book } = makeSut()

		expect(screen.getByText(String(book?.title))).toBeInTheDocument()

		expect(screen.getByAltText('Book image')).toBeInTheDocument()
		expect(screen.getByText(`${book?.pages} páginas`)).toBeInTheDocument()
		expect(screen.getByText(String(book?.releaseDate))).toBeInTheDocument()
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

	test('should redirect to book details page when clicking on book title', async () => {
		const { book } = makeSut()

		const bookTitle = screen.getByText(String(book?.title))

		fireEvent.click(bookTitle)

		expect(mockRouter).toMatchObject({
			asPath: `/books/${book.id}`,
			pathname: '/books/[id]',
		})
	})

	test('should redirect to book details page when clicking on book image', async () => {
		const { book } = makeSut()

		const bookImage = screen.getByAltText('Book image')

		fireEvent.click(bookImage)

		mockRouter.reload()
		expect(mockRouter).toMatchObject({
			asPath: `/books/${book.id}`,
			pathname: '/books/[id]',
		})
	})
})
