import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { useGetPotions } from '@/shared/hooks/use-get-potions'
import { PotionsList } from '@/app/potions/components/potions-list'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getPotionsEmptyResponseHandler,
	getPotionsErrorResponseHandler,
	getPotionsSuccessResponseHandler,
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
			useGetPotions({
				name: '',
				currentPage: DEFAULT_PAGINATION_PAGE,
				rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
			}),
		{ wrapper },
	)

	render(<PotionsList />, {
		wrapper,
	})

	return {
		result,
	}
}

describe('potions-list component', () => {
	test('renders skeleton when loading or fetching', async () => {
		const { result } = makeSut(getPotionsSuccessResponseHandler)

		const skeletons = screen.getAllByTestId('potion-skeleton-item')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeletons).toHaveLength(6)
	})

	test('should renders potions list correctly', async () => {
		const { result } = makeSut(getPotionsSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const potionItems = screen.getAllByTestId('potion-item')
			expect(potionItems).toHaveLength(5)
		})
	})

	test('should renders no potions message when potions list is empty', async () => {
		const { result } = makeSut(getPotionsEmptyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const noPotionsMessage = screen.getByText(
				'Não há poções para serem listadas',
			)
			expect(noPotionsMessage).toBeInTheDocument()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getPotionsErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const error = screen.getByTestId('error')
			expect(error).toBeInTheDocument()
		})
	})

	test('should update characters list when search field is filled', async () => {
		const { result } = makeSut(getPotionsSuccessResponseHandler)

		const searchField = screen.getByTestId('search-field')
		fireEvent.input(searchField, { target: { value: 'Ageing Potion' } })

		expect(result.current.isLoading).toBeTruthy()

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const potionItems = screen.getAllByTestId('potion-item')
			expect(potionItems).toHaveLength(1)
		})
	})
})
