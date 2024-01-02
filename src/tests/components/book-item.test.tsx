import { Book } from '@/entities/Book'
import { BookItem } from '@/app/books/components/book-item'
import { makeBookResponse } from '@/tests/hooks/handlers'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

const makeSut = (initialBook?: Book) => {
	makeRouterSut()

	const {
		data: { attributes, ...baseBook },
	} = makeBookResponse()

	const book =
		initialBook ??
		new Book({
			...baseBook,
			...attributes,
			releaseDate: attributes.release_date,
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
		const {
			data: { attributes, ...baseBook },
		} = makeBookResponse()

		makeSut(
			new Book({
				...baseBook,
				...attributes,
				releaseDate: attributes.release_date,
				cover: '',
			}),
		)

		console.log(
			'screen.getByAltText:',
			screen.getByTestId('alternative-book-icon'),
		)
		expect(screen.getByTestId('alternative-book-icon')).toBeInTheDocument()
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
