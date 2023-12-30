import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { server } from '@/setup-tests'
import { getSpells } from '@/shared/services/get-spells'
import {
	getSpellsErrorResponseHandler,
	getSpellsSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-spells service', () => {
	test('should return a list of spells', async () => {
		makeSut(getSpellsSuccessResponseHandler)

		const spells = await getSpells.execute()

		expect(spells.data).toHaveLength(5)
	})

	test('should return a list of spells when filters was passed', async () => {
		makeSut(getSpellsSuccessResponseHandler)

		const spells = await getSpells.execute({
			name: 'Harry Potter and the Half-Blood Prince',
			currentPage: DEFAULT_PAGINATION_PAGE,
			rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
		})

		expect(spells.data).toHaveLength(5)
	})

	test.fails('should fails when the request fails', async () => {
		makeSut(getSpellsErrorResponseHandler)

		const spells = await getSpells.execute({
			name: 'Harry Potter',
			currentPage: DEFAULT_PAGINATION_PAGE,
			rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
		})

		expect(spells).toBeNull()
	})
})
