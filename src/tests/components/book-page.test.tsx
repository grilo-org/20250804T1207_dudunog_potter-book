import { useGetBook } from '@/app/books/hooks/use-get-book'
import Book from '@/app/books/[id]/page'
import { server } from '@/setup-tests'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import {
	getBookNotFoundResponseHandler,
	getBookSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

vitest.mock('next/navigation', () => ({
	useParams() {
		return {
			id: '99015cdb-bf16-4042-863a-b25b41b004f2',
		}
	},
}))

const makeSut = (handler: HttpHandler, bookId: string) => {
	makeRouterSut()

	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetBook({
				id: bookId,
			}),
		{ wrapper },
	)

	render(<Book />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('book-page component', () => {
	afterEach(() =>
		resetMockRouter('/books/99015cdb-bf16-4042-863a-b25b41b004f2'),
	)

	test('renders skeleton when loading or fetching', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookSuccessResponseHandler(bookId), bookId)

		const skeleton = screen.getByTestId('book-details-skeleton')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeleton).toBeInTheDocument()
	})

	test('should renders book details correctly', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookSuccessResponseHandler(bookId), bookId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const bookDetails = screen.getByTestId('book-details')

			expect(bookDetails).toBeInTheDocument()
		})
	})

	test('should renders no found book message when book was not found', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookNotFoundResponseHandler(bookId), bookId)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const notFoundBookMessage = screen.getByText('Nenhum livro encontrado')

			expect(notFoundBookMessage).toBeInTheDocument()
		})
	})

	test('should return to books listing page when click in back button', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookSuccessResponseHandler(bookId), bookId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const backButton = screen.getByTestId('back-button')

			fireEvent.click(backButton)

			expect(mockRouter).toMatchObject({
				asPath: '/books',
				pathname: '/books',
			})
		})
	})
})
