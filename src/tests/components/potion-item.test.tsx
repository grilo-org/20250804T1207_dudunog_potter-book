import { Potion } from '@/entities/Potion'
import { PotionItem } from '@/app/potions/components/potion-item'
import { PotionPropsMock } from '@/tests/mocks/potion.mock'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialPotion?: Potion) => {
	makeRouterSut()

	const potion =
		initialPotion ??
		new Potion({
			...PotionPropsMock,
		})

	render(<PotionItem potion={potion} />, {
		wrapper: MemoryRouterProvider,
	})

	return {
		potion,
	}
}

describe('potion-item component', () => {
	afterEach(() => resetMockRouter('/potions'))

	test('renders potion details correctly', async () => {
		const { potion } = makeSut()

		expect(screen.getByText(String(potion?.name))).toBeInTheDocument()

		expect(screen.getByAltText('Potion image')).toBeInTheDocument()
		expect(screen.getByText(potion?.difficulty)).toBeInTheDocument()
		expect(screen.getByText(potion?.effect)).toBeInTheDocument()
		expect(screen.getByText(potion?.characteristics)).toBeInTheDocument()
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

	test('should redirect to potion details page when clicking on potion name', async () => {
		const { potion } = makeSut()

		const potionName = screen.getByText(String(potion?.name))

		fireEvent.click(potionName)

		expect(mockRouter).toMatchObject({
			asPath: `/potions/${potion.id}`,
			pathname: '/potions/[id]',
		})
	})

	test('should redirect to potion details page when clicking on potion image', async () => {
		const { potion } = makeSut()

		const potionImage = screen.getByAltText('Potion image')

		fireEvent.click(potionImage)

		mockRouter.reload()
		expect(mockRouter).toMatchObject({
			asPath: `/potions/${potion.id}`,
			pathname: '/potions/[id]',
		})
	})
})
