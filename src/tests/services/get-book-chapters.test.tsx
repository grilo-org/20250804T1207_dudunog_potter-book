import { Chapter } from '@/entities/Chapter'
import { getBookChapters } from '@/app/books/services/get-book-chapters'
import { server } from '@/setup-tests'
import {
	getBookChapterErrorResponseHandler,
	getBookChapterSuccessResponseHandler,
	makeBookChaptersResponse,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-book-chapters service', () => {
	test('should return the book chapters', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'

		const { data } = makeBookChaptersResponse()

		makeSut(getBookChapterSuccessResponseHandler(bookId))

		const bookChaptersResponse = await getBookChapters.execute({
			id: bookId,
		})

		bookChaptersResponse.forEach((chapter, index) => {
			expect(chapter).toBeInstanceOf(Chapter)
			expect(chapter).toEqual(
				new Chapter({
					...data[index].attributes,
					id: data[index].id,
					type: data[index].type,
				}),
			)
		})
		expect(bookChaptersResponse).toHaveLength(5)
	})

	test.fails("should fails when an id wasn't passed", async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'
		makeSut(getBookChapterSuccessResponseHandler(bookId))

		const bookChapters = await getBookChapters.execute()

		expect(bookChapters).toBeNull()
	})

	test.fails('should fails when the request fails', async () => {
		const bookId = '99015cdb-bf16-4042-863a-b25b41b004f2'

		makeSut(getBookChapterErrorResponseHandler(bookId))

		const bookChapters = await getBookChapters.execute({
			id: bookId,
		})

		expect(bookChapters).toBeNull()
	})
})
