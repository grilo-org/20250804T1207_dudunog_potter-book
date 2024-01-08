import { Character } from '@/entities/Character'
import { CharacterItem } from '@/app/characters/components/character-item'
import { CharacterPropsMock } from '@/tests/mocks/character.mock'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialCharacter?: Character) => {
	makeRouterSut()

	const character =
		initialCharacter ??
		new Character({
			...CharacterPropsMock,
		})

	render(<CharacterItem character={character} />, {
		wrapper: MemoryRouterProvider,
	})

	return {
		character,
	}
}

describe('character-item component', () => {
	afterEach(() => resetMockRouter('/characters'))

	test('renders character details correctly', async () => {
		const { character } = makeSut()

		expect(screen.getByText(String(character?.name))).toBeInTheDocument()

		expect(screen.getByAltText('Character image')).toBeInTheDocument()
		expect(screen.getByText(character?.species)).toBeInTheDocument()
		expect(screen.getByText(character?.gender)).toBeInTheDocument()
	})

	test('should renders alternative image when character image is not available', async () => {
		makeSut(
			new Character({
				...CharacterPropsMock,
				image: '',
			}),
		)

		expect(
			screen.getByTestId('alternative-character-image'),
		).toBeInTheDocument()
	})

	test('should redirect to character details page when clicking on character name', async () => {
		const { character } = makeSut()

		const characterName = screen.getByText(String(character?.name))

		fireEvent.click(characterName)

		expect(mockRouter).toMatchObject({
			asPath: `/characters/${character.id}`,
			pathname: '/characters/[id]',
		})
	})

	test('should redirect to character details page when clicking on character image', async () => {
		const { character } = makeSut()

		const characterImage = screen.getByAltText('Character image')

		fireEvent.click(characterImage)

		mockRouter.reload()
		expect(mockRouter).toMatchObject({
			asPath: `/characters/${character.id}`,
			pathname: '/characters/[id]',
		})
	})
})
