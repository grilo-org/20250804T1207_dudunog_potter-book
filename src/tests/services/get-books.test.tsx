import { getBooks } from '@/shared/services/get-books'
import { server } from '@/setup-tests'
import {
	getBooksErrorResponseHandler,
	getBooksSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-books service', () => {
	test('should return a list of books', async () => {
		makeSut(getBooksSuccessResponseHandler)

		const books = await getBooks.execute()

		expect(books).toHaveLength(5)
	})

	test('should return a list of books when a name filter was passed', async () => {
		makeSut(getBooksSuccessResponseHandler)

		const books = await getBooks.execute({
			name: 'Harry Potter',
		})

		expect(books).toHaveLength(5)
	})

	test.fails('should fails when the request fails', async () => {
		makeSut(getBooksErrorResponseHandler)

		const books = await getBooks.execute({
			name: 'Harry Potter',
		})

		expect(books).toBeNull()
	})
})
