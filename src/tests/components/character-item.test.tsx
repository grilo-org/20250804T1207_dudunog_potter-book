import { Character } from '@/entities/Character'
import { CharacterItem } from '@/app/characters/components/character-item'
import { makeCharacterResponse } from '@/tests/hooks/handlers'
import { makeRouterSut, resetMockRouter } from '@/tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

const makeSut = (initialCharacter?: Character) => {
	makeRouterSut()

	const {
		data: { attributes, ...baseCharacter },
	} = makeCharacterResponse()

	const character =
		initialCharacter ??
		new Character({
			...baseCharacter,
			...attributes,
			aliasNames: attributes.alias_names,
			bloodStatus: attributes.blood_status,
			eyeColor: attributes.eye_color,
			familyMembers: attributes.family_members,
			hairColor: attributes.hair_color,
			maritalStatus: attributes.marital_status,
		})

	render(<CharacterItem character={character} />, {
		wrapper: MemoryRouterProvider,
	})

	return {
		character,
	}
}

describe('character-item component', () => {
	afterEach(() => resetMockRouter('/books'))

	test('renders character details correctly', async () => {
		const { character } = makeSut()

		expect(screen.getByText(String(character?.name))).toBeInTheDocument()

		expect(screen.getByAltText('Character image')).toBeInTheDocument()
		expect(screen.getByText(character?.species)).toBeInTheDocument()
		expect(screen.getByText(character?.gender)).toBeInTheDocument()
	})

	test('should renders alternative image when character image is not available', async () => {
		const {
			data: { attributes, ...baseCharacter },
		} = makeCharacterResponse()

		makeSut(
			new Character({
				...baseCharacter,
				...attributes,
				aliasNames: attributes.alias_names,
				bloodStatus: attributes.blood_status,
				eyeColor: attributes.eye_color,
				familyMembers: attributes.family_members,
				hairColor: attributes.hair_color,
				maritalStatus: attributes.marital_status,
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
