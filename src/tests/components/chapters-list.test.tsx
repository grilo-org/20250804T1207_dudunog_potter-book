import { useGetBookChapters } from '@/app/books/hooks/use-get-book-chapters'
import { ChaptersList } from '@/app/books/components/chapters-list'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getBookChaptersSuccessResponseHandler,
	getBookChaptersEmptyResponseHandler,
	getBookChaptersErrorResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetBookChapters({
				id: bookId,
			}),
		{ wrapper },
	)

	render(<ChaptersList bookId={bookId} />, {
		wrapper,
	})

	return {
		result,
	}
}

describe('chapters-list component', () => {
	test('renders skeleton when loading or fetching', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookChaptersSuccessResponseHandler(bookId))

		const skeletons = screen.getAllByTestId('book-chapter-skeleton-item')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeletons).toHaveLength(10)
	})

	test('should renders chapters list correctly', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookChaptersSuccessResponseHandler(bookId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const bookChaptersItems = screen.getAllByTestId('book-chapter-item')

			expect(bookChaptersItems).toHaveLength(5)
		})
	})

	test('should renders no book chapters message when book chapters list is empty', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookChaptersEmptyResponseHandler(bookId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const noBookChaptersMessage = screen.getByText(
				'Não há capítulos disponíveis deste livro',
			)

			expect(noBookChaptersMessage).toBeInTheDocument()
		})
	})

	test('should renders no chapter summary message when a chapter summary is empty', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookChaptersSuccessResponseHandler(bookId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			fireEvent.click(screen.getAllByTestId('chapter-accordion-title')[3])

			const noBookChapterSummary = screen.getByText(
				'Não há resumo para este capítulo',
			)

			expect(noBookChapterSummary).toBeInTheDocument()
		})
	})

	test('should return an error state when the request fails', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookChaptersErrorResponseHandler(bookId))

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const error = screen.getByTestId('error')
			expect(error).toBeInTheDocument()
		})
	})
})
