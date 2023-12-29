import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { server } from '@/setup-tests'
import { getPotions } from '@/shared/services/get-potions'
import {
	potionsErrorResponseHandler,
	potionsSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-potions service', () => {
	test('should return a list of potions', async () => {
		makeSut(potionsSuccessResponseHandler)

		const potions = await getPotions.execute()

		expect(potions.data).toHaveLength(5)
	})

	test('should return a list of potions when filters was passed', async () => {
		makeSut(potionsSuccessResponseHandler)

		const potions = await getPotions.execute({
			name: 'Harry Potter and the Half-Blood Prince',
			currentPage: DEFAULT_PAGINATION_PAGE,
			rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
		})

		expect(potions.data).toHaveLength(5)
	})

	test.fails('should fails when the request fails', async () => {
		makeSut(potionsErrorResponseHandler)

		const potions = await getPotions.execute({
			name: 'Harry Potter',
			currentPage: DEFAULT_PAGINATION_PAGE,
			rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
		})

		expect(potions).toBeNull()
	})
})
