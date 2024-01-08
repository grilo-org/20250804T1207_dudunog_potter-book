import { useGetPotion } from '@/app/potions/hooks/use-get-potion'
import { PotionTabsList } from '@/app/potions/components/potion-tabs-list'
import { server } from '@/setup-tests'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { getPotionSuccessResponseHandler } from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

const makeSut = (handler?: HttpHandler) => {
	const potionId = '04f6e0eb-5695-469f-8b07-ff1264d78178'

	makeRouterSut()

	if (handler) {
		server.use(handler)
	}

	const { result } = renderHook(
		() =>
			useGetPotion({
				id: potionId,
			}),
		{ wrapper },
	)

	render(<PotionTabsList potionId={potionId} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('potion-tabs-list component', () => {
	afterEach(() =>
		resetMockRouter('/potions/04f6e0eb-5695-469f-8b07-ff1264d78178'),
	)

	test('should renders potion details correctly', async () => {
		const potionId = '04f6e0eb-5695-469f-8b07-ff1264d78178'

		makeSut(getPotionSuccessResponseHandler(potionId))

		expect(screen.getByTestId('potion-tabs')).toBeInTheDocument()
	})

	test('should change tab content when click in a tab', async () => {
		const potionId = '04f6e0eb-5695-469f-8b07-ff1264d78178'
		const characteristicsTabKey = 'characteristics'

		const { result } = makeSut(getPotionSuccessResponseHandler(potionId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const lastTab = screen.getByTestId(
				`${characteristicsTabKey}-tab-item-header`,
			)

			fireEvent.click(lastTab)

			expect(
				screen.getByTestId(`${characteristicsTabKey}-tab-item-content`),
			).toBeInTheDocument()
		})
	})
})
