import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { useGetCharacters } from '@/shared/hooks/use-get-characters'
import { CharactersList } from '@/app/characters/components/characters-list'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getCharactersEmptyResponseHandler,
	getCharactersErrorResponseHandler,
	getCharactersSuccessResponseHandler,
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
			useGetCharacters({
				name: '',
				currentPage: DEFAULT_PAGINATION_PAGE,
				rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
			}),
		{ wrapper },
	)

	render(<CharactersList />, {
		wrapper,
	})

	return {
		result,
	}
}

describe('characters-list component', () => {
	test('should renders skeleton when loading or fetching', async () => {
		const { result } = makeSut(getCharactersSuccessResponseHandler)

		const skeletons = screen.getAllByTestId('character-skeleton-item')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeletons).toHaveLength(6)
	})

	test('should renders characters list correctly', async () => {
		const { result } = makeSut(getCharactersSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const characterItems = screen.getAllByTestId('character-item')
			expect(characterItems).toHaveLength(5)
		})
	})

	test('should renders no characters message when characters list is empty', async () => {
		const { result } = makeSut(getCharactersEmptyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const noCharactersMessage = screen.getByText(
				'Não há personagens para serem listados',
			)
			expect(noCharactersMessage).toBeInTheDocument()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getCharactersErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const error = screen.getByTestId('error')
			expect(error).toBeInTheDocument()
		})
	})

	test('should update characters list when search field is filled', async () => {
		const { result } = makeSut(getCharactersSuccessResponseHandler)

		const searchField = screen.getByTestId('search-field')
		fireEvent.input(searchField, { target: { value: 'slytherin' } })

		expect(result.current.isLoading).toBeTruthy()

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const characterItems = screen.getAllByTestId('character-item')
			expect(characterItems).toHaveLength(1)
		})
	})
})
