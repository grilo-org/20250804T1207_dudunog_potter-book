import { Book } from '@/entities/Book'
import { useGetBookChapters } from '@/app/books/hooks/use-get-book-chapters'
import { BookDetails } from '@/app/books/components/book-details'
import { server } from '@/setup-tests'
import { BookPropsMock } from '@/tests/mocks/book.mock'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { getBookChaptersSuccessResponseHandler } from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (handler?: HttpHandler, initialBook?: Book) => {
	if (handler) {
		server.use(handler)
	}

	makeRouterSut()

	const book =
		initialBook ??
		new Book({
			...BookPropsMock,
		})

	const { result } = renderHook(
		() =>
			useGetBookChapters({
				id: book.id,
			}),
		{ wrapper },
	)

	render(<BookDetails book={book} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		book,
		result,
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
			undefined,
			new Book({
				...BookPropsMock,
				cover: '',
			}),
		)

		expect(screen.getByTestId('alternative-book-image')).toBeInTheDocument()
	})

	test('should renders ChaptersList', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookChaptersSuccessResponseHandler(bookId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			expect(screen.getByTestId('chapters-list')).toBeInTheDocument()
		})
	})
})
