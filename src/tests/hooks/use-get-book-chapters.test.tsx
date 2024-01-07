import { Chapter } from '@/entities/Chapter'
import { useGetBookChapters } from '@/app/books/hooks/use-get-book-chapters'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getBookChaptersEmptyResponseHandler,
	getBookChaptersErrorResponseHandler,
	getBookChaptersSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler, bookId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetBookChapters({
				id: bookId,
			}),
		{ wrapper },
	)

	return {
		result,
	}
}

describe('use-get-book-chapters hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(
			getBookChaptersSuccessResponseHandler(bookId),
			bookId,
		)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a book chapters', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(
			getBookChaptersSuccessResponseHandler(bookId),
			bookId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(Array.isArray(result.current.bookChapters)).toBeTruthy()
			expect(result.current.bookChapters).toHaveLength(5)

			result.current.bookChapters?.forEach(chapter => {
				expect(chapter).toBeInstanceOf(Chapter)
			})
		})
	})

	test('should return null when the server returns no book chapters', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(
			getBookChaptersEmptyResponseHandler(bookId),
			bookId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.bookChapters).toEqual([])
		})
	})

	test('should return an error state when the request fails', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(
			getBookChaptersErrorResponseHandler(bookId),
			bookId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
