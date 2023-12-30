import { Book } from '@/entities/Book'
import { useGetBooks } from '@/shared/hooks/use-get-books'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getBooksEmptyResponseHandler,
	getBooksErrorResponseHandler,
	getBooksSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(() => useGetBooks(), { wrapper })

	return {
		result,
	}
}

describe('use-get-books hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const { result } = makeSut(getBooksSuccessResponseHandler)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a list of books', async () => {
		const { result } = makeSut(getBooksSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(Array.isArray(result.current.books)).toBeTruthy()
			expect(result.current.books).toHaveLength(5)

			result.current.books?.forEach(book => {
				expect(book).toBeInstanceOf(Book)
			})
		})
	})

	test('should return null when the server returns no books', async () => {
		const { result } = makeSut(getBooksEmptyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.books).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getBooksErrorResponseHandler)

		await waitFor(() => {
			console.log('result.current:', result.current)
			expect(result.current.isError).toBeTruthy()
		})
	})

	// test('should return a list of books when a name filter was passed', async () => {
	// 	makeSut(getBooksSuccessResponseHandler)

	// 	const books = await getBooks.execute({
	// 		name: 'Harry Potter',
	// 	})

	// 	expect(books).toHaveLength(5)
	// })
})
