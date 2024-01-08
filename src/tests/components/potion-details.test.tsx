import { Potion } from '@/entities/Potion'
import { PotionDetails } from '@/app/potions/components/potion-details'
import { PotionPropsMock } from '@/tests/mocks/potion.mock'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialPotion?: Potion) => {
	makeRouterSut()

	const potion =
		initialPotion ??
		new Potion({
			...PotionPropsMock,
		})

	render(<PotionDetails potion={potion} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		potion,
	}
}

describe('potion-details component', () => {
	afterEach(() =>
		resetMockRouter('/potions/04f6e0eb-5695-469f-8b07-ff1264d78178'),
	)

	test('renders potion details correctly', async () => {
		const { potion } = makeSut()

		expect(screen.getByText(String(potion?.name))).toBeInTheDocument()

		expect(screen.getByAltText('Potion image')).toBeInTheDocument()
		expect(screen.getByText(potion?.difficulty)).toBeInTheDocument()
		expect(screen.getByText(potion?.effect)).toBeInTheDocument()
		expect(screen.getByText(potion?.time)).toBeInTheDocument()
		expect(screen.getByText(potion?.sideEffects)).toBeInTheDocument()
	})

	test('should renders alternative image when potion image is not available', async () => {
		makeSut(
			new Potion({
				...PotionPropsMock,
				image: '',
			}),
		)

		expect(screen.getByTestId('alternative-potion-image')).toBeInTheDocument()
	})
})
