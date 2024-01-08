import { useGetCharacter } from '@/app/characters/hooks/use-get-character'
import Character from '@/app/characters/[id]/page'
import { server } from '@/setup-tests'
import { resetMockRouter, wrapper } from '@/tests/utils'
import {
	getCharacterNotFoundResponseHandler,
	getCharacterSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

vitest.mock('next/navigation', () => ({
	useParams() {
		return {
			id: 'f096911b-a140-4cee-96f3-0f92b6a56102',
		}
	},
}))

const makeSut = (handler: HttpHandler, characterId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetCharacter({
				id: characterId,
			}),
		{ wrapper },
	)

	render(<Character />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('character-page component', () => {
	afterEach(() =>
		resetMockRouter('/characters/f096911b-a140-4cee-96f3-0f92b6a56102'),
	)

	test('renders skeleton when loading or fetching', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterSuccessResponseHandler(characterId),
			characterId,
		)

		const skeleton = screen.getByTestId('character-details-skeleton')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeleton).toBeInTheDocument()
	})

	test('should renders character details correctly', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterSuccessResponseHandler(characterId),
			characterId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const characterDetails = screen.getByTestId('character-details')

			expect(characterDetails).toBeInTheDocument()
		})
	})

	test('should renders no found character message when character was not found', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterNotFoundResponseHandler(characterId),
			characterId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const notFoundCharacterMessage = screen.getByText(
				'Nenhum personagem encontrado',
			)

			expect(notFoundCharacterMessage).toBeInTheDocument()
		})
	})

	test('should return to characters listing page when click in back button', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterSuccessResponseHandler(characterId),
			characterId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const backButton = screen.getByTestId('back-button')

			fireEvent.click(backButton)

			expect(mockRouter).toMatchObject({
				asPath: '/characters',
				pathname: '/characters',
			})
		})
	})
})
