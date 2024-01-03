import { Spell } from '@/entities/Spell'
import { SpellItem } from '@/app/spells/components/spell-item'
import { makeSpellResponse } from '@/tests/hooks/handlers'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { SpellPropsMock } from '@/tests/mocks/spell.mock'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

const makeSut = (initialSpell?: Spell) => {
	makeRouterSut()

	const spell =
		initialSpell ??
		new Spell({
			...SpellPropsMock,
		})

	render(<SpellItem spell={spell} />, {
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

		expect(screen.getByAltText('Spell image')).toBeInTheDocument()
		expect(screen.getByText(spell?.category)).toBeInTheDocument()
		expect(screen.getByText(spell?.incantation)).toBeInTheDocument()
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

	test('should redirect to spell details page when clicking on spell name', async () => {
		const { spell } = makeSut()

		const spellName = screen.getByText(String(spell?.name))

		fireEvent.click(spellName)

		expect(mockRouter).toMatchObject({
			asPath: `/spells/${spell.id}`,
			pathname: '/spells/[id]',
		})
	})

	test('should redirect to spell details page when clicking on spell image', async () => {
		const { spell } = makeSut()

		const spellImage = screen.getByAltText('Spell image')

		fireEvent.click(spellImage)

		mockRouter.reload()
		expect(mockRouter).toMatchObject({
			asPath: `/spells/${spell.id}`,
			pathname: '/spells/[id]',
		})
	})
})
