import { Spell } from '@/entities/Spell'
import { SpellDetails } from '@/app/spells/components/spell-details'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { SpellPropsMock } from '@/tests/mocks/spell.mock'
import { render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialSpell?: Spell) => {
	makeRouterSut()

	const spell =
		initialSpell ??
		new Spell({
			...SpellPropsMock,
		})

	render(<SpellDetails spell={spell} />, {
		wrapper: MemoryRouterProvider,
	})

	return {
		spell,
	}
}

describe('spell-item component', () => {
	afterEach(() => resetMockRouter('/spells'))

	test('renders spell details correctly', async () => {
		const { spell } = makeSut()

		expect(screen.getByText(String(spell?.name))).toBeInTheDocument()
		expect(screen.getByText(String(spell?.incantation))).toBeInTheDocument()
		expect(screen.getByAltText('Spell image')).toBeInTheDocument()
		expect(screen.getByText(spell?.category)).toBeInTheDocument()
		expect(screen.getByText(spell?.effect)).toBeInTheDocument()
		expect(screen.getByText(spell?.creator)).toBeInTheDocument()
		expect(screen.getByText(spell?.light)).toBeInTheDocument()
		expect(screen.getByText(spell?.hand)).toBeInTheDocument()
	})

	test('should renders alternative image when spell image is not available', async () => {
		makeSut(
			new Spell({
				...SpellPropsMock,
				image: '',
			}),
		)

		expect(screen.getByTestId('alternative-spell-image')).toBeInTheDocument()
	})
})
