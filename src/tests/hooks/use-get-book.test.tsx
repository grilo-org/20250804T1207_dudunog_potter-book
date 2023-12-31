import { Book } from '@/entities/Book'
import { useGetBook } from '@/app/books/hooks/use-get-book'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getBookEmptyResponseHandler,
	getBookErrorResponseHandler,
	getBookSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler, bookId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetBook({
				id: bookId,
			}),
		{ wrapper },
	)

	return {
		result,
	}
}

describe('use-get-book hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookSuccessResponseHandler(bookId), bookId)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a book', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookSuccessResponseHandler(bookId), bookId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.book).toBeInstanceOf(Book)
		})
	})

	test('should return null when the server returns no book', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookEmptyResponseHandler(bookId), bookId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.book).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		const { result } = makeSut(getBookErrorResponseHandler(bookId), bookId)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
