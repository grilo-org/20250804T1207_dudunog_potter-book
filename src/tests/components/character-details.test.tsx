import { Character } from '@/entities/Character'
import { CharacterDetails } from '@/app/characters/components/character-details'
import { CharacterPropsMock } from '@/tests/mocks/character.mock'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

const makeSut = (initialCharacter?: Character) => {
	makeRouterSut()

	const character =
		initialCharacter ??
		new Character({
			...CharacterPropsMock,
		})

	render(<CharacterDetails character={character} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		character,
	}
}

describe('character-details component', () => {
	afterEach(() =>
		resetMockRouter('/characters/70107ed4-9555-4d21-8fbc-c79bd90800ba'),
	)

	test('renders character details correctly', async () => {
		const { character } = makeSut()

		expect(screen.getByText(String(character?.name))).toBeInTheDocument()
		expect(
			screen.getByText(String(character?.aliasNames[0])),
		).toBeInTheDocument()

		expect(screen.getByAltText('Character image')).toBeInTheDocument()
		expect(screen.getByText(character?.born)).toBeInTheDocument()
		expect(screen.getByText(character?.gender)).toBeInTheDocument()
		expect(screen.getByText(character?.nationality)).toBeInTheDocument()
		expect(screen.getByText(character?.maritalStatus)).toBeInTheDocument()
		expect(screen.getByText(character?.bloodStatus)).toBeInTheDocument()
		expect(screen.getByText(character?.house)).toBeInTheDocument()
		expect(screen.getByText(character?.eyeColor)).toBeInTheDocument()
		expect(screen.getByText(character?.hairColor)).toBeInTheDocument()
		expect(screen.getByText(character?.height)).toBeInTheDocument()
		expect(screen.getByText(character?.weight)).toBeInTheDocument()
		expect(screen.getByText(character?.boggart)).toBeInTheDocument()
		expect(screen.getByText(character?.patronus)).toBeInTheDocument()
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
})
