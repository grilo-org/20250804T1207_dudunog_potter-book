import { useGetPotion } from '@/app/potions/hooks/use-get-potion'
import Potion from '@/app/potions/[id]/page'
import { server } from '@/setup-tests'
import { resetMockRouter, wrapper } from '@/tests/utils'
import {
	getPotionNotFoundResponseHandler,
	getPotionSuccessResponseHandler,
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
			id: 'af984889-3b1f-4b43-a49c-71c45d6fc012',
		}
	},
}))

const makeSut = (handler: HttpHandler, potionId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetPotion({
				id: potionId,
			}),
		{ wrapper },
	)

	render(<Potion />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('potion-page component', () => {
	afterEach(() =>
		resetMockRouter('/potions/af984889-3b1f-4b43-a49c-71c45d6fc012'),
	)

	test('renders skeleton when loading or fetching', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionSuccessResponseHandler(potionId),
			potionId,
		)

		const skeleton = screen.getByTestId('potion-details-skeleton')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeleton).toBeInTheDocument()
	})

	test('should renders potion details correctly', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionSuccessResponseHandler(potionId),
			potionId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const potionDetails = screen.getByTestId('potion-details')

			expect(potionDetails).toBeInTheDocument()
		})
	})

	test('should renders no found potion message when potion was not found', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionNotFoundResponseHandler(potionId),
			potionId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const notFoundPotionMessage = screen.getByText('Nenhuma poção encontrada')

			expect(notFoundPotionMessage).toBeInTheDocument()
		})
	})

	test('should return to potions listing page when click in back button', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionSuccessResponseHandler(potionId),
			potionId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const backButton = screen.getByTestId('back-button')

			fireEvent.click(backButton)

			expect(mockRouter).toMatchObject({
				asPath: '/potions',
				pathname: '/potions',
			})
		})
	})
})
