import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { useGetSpells } from '@/shared/hooks/use-get-spells'
import { SpellsList } from '@/app/spells/components/spells-list'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getSpellsEmptyResponseHandler,
	getSpellsErrorResponseHandler,
	getSpellsSuccessResponseHandler,
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
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetSpells({
				name: '',
				currentPage: DEFAULT_PAGINATION_PAGE,
				rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
			}),
		{ wrapper },
	)

	render(<SpellsList />, {
		wrapper,
	})

	return {
		result,
	}
}

describe('spells-list component', () => {
	test('renders skeleton when loading or fetching', async () => {
		const { result } = makeSut(getSpellsSuccessResponseHandler)

		const skeletons = screen.getAllByTestId('spell-skeleton-item')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeletons).toHaveLength(6)
	})

	test('should renders spells list correctly', async () => {
		const { result } = makeSut(getSpellsSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const spellItems = screen.getAllByTestId('spell-item')
			expect(spellItems).toHaveLength(5)
		})
	})

	test('should renders no spells message when spells list is empty', async () => {
		const { result } = makeSut(getSpellsEmptyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const noSpellsMessage = screen.getByText(
				'Não há feitiços para serem listados',
			)
			expect(noSpellsMessage).toBeInTheDocument()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getSpellsErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const error = screen.getByTestId('error')
			expect(error).toBeInTheDocument()
		})
	})

	test('should update characters list when search field is filled', async () => {
		const { result } = makeSut(getSpellsSuccessResponseHandler)

		const searchField = screen.getByTestId('search-field')
		fireEvent.input(searchField, { target: { value: 'Anapneo' } })

		expect(result.current.isLoading).toBeTruthy()

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const potionItems = screen.getAllByTestId('potion-item')
			expect(potionItems).toHaveLength(1)
		})
	})
})
