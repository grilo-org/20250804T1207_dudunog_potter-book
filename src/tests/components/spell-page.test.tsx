import { useGetSpell } from '@/app/spells/hooks/use-get-spell'
import Spell from '@/app/spells/[id]/page'
import { server } from '@/setup-tests'
import { resetMockRouter, wrapper } from '@/tests/utils'
import {
	getSpellNotFoundResponseHandler,
	getSpellSuccessResponseHandler,
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
			id: '363adee4-5b00-47cc-9dab-a2ab5bbbaae4',
		}
	},
}))

const makeSut = (handler: HttpHandler, spellId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetSpell({
				id: spellId,
			}),
		{ wrapper },
	)

	render(<Spell />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('spell-page component', () => {
	afterEach(() =>
		resetMockRouter('/spells/363adee4-5b00-47cc-9dab-a2ab5bbbaae4'),
	)

	test('renders skeleton when loading or fetching', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellSuccessResponseHandler(spellId), spellId)

		const skeleton = screen.getByTestId('spell-details-skeleton')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeleton).toBeInTheDocument()
	})

	test('should renders spell details correctly', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellSuccessResponseHandler(spellId), spellId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const spellDetails = screen.getByTestId('spell-details')

			expect(spellDetails).toBeInTheDocument()
		})
	})

	test('should renders no found spell message when spell was not found', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(
			getSpellNotFoundResponseHandler(spellId),
			spellId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const notFoundSpellMessage = screen.getByText('Nenhum feitiço encontrado')

			expect(notFoundSpellMessage).toBeInTheDocument()
		})
	})

	test('should return to spells listing page when click in back button', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellSuccessResponseHandler(spellId), spellId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const backButton = screen.getByTestId('back-button')

			fireEvent.click(backButton)

			expect(mockRouter).toMatchObject({
				asPath: '/spells',
				pathname: '/spells',
			})
		})
	})
})
