import { server } from '@/setup-tests'
import { Book } from '@/entities/Book'
import { getBook } from '@/app/books/services/get-book'
import {
	getBookErrorResponseHandler,
	getBookSuccessResponseHandler,
	makeBookResponse,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-book service', () => {
	test('should return a book', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'

		const {
			data: {
				links,
				relationships,
				attributes: { release_date, ...attributesRest },
				...dataRest
			},
		} = makeBookResponse()

		makeSut(getBookSuccessResponseHandler(bookId))

		const bookResponse = await getBook.execute({
			id: bookId,
		})

		expect(bookResponse).toBeInstanceOf(Book)
		expect(bookResponse).toEqual(
			new Book({
				...attributesRest,
				...dataRest,
				releaseDate: release_date,
			}),
		)
	})

	test.fails("should fails when an id wasn't passed", async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		makeSut(getBookSuccessResponseHandler(bookId))

		const book = await getBook.execute()

		expect(book).toBeNull()
	})

	test.fails('should fails when the request fails', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'

		makeSut(getBookErrorResponseHandler(bookId))

		const book = await getBook.execute({
			id: bookId,
		})

		expect(book).toBeNull()
	})
})
